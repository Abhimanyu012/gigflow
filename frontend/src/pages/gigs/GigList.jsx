import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, DollarSign, Calendar, Briefcase, X } from 'lucide-react';
import { fetchGigs, searchGigs } from '../../store/slices/gigSlice';
import { Badge, Button, Input, LoadingScreen, EmptyState } from '../../components/ui';

const GigList = () => {
  const dispatch = useDispatch();
  const { gigs, isLoading, pagination } = useSelector((state) => state.gigs);
  const [searchQuery, setSearchQuery] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchGigs({ page: 1, limit: 12 }));
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchGigs({ q: searchQuery, minBudget, maxBudget }));
    } else {
      dispatch(fetchGigs({ page: 1, limit: 12 }));
    }
  };

  const handlePageChange = (page) => {
    dispatch(fetchGigs({ page, limit: 12 }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusVariant = (status) =>
    ({ open: 'success', 'in-progress': 'warning', completed: 'info', cancelled: 'danger' }[status] || 'default');

  if (isLoading && gigs.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-matte-charcoal">
      {/* ── Page header strip ── */}
      <div className="border-b border-matte-divider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-sans font-semibold uppercase tracking-widest text-matte-stone/35 mb-1">
                Marketplace
              </p>
              <h1 className="text-2xl md:text-3xl font-display font-extrabold text-matte-bone tracking-tight">
                Browse Gigs
              </h1>
            </div>
            {gigs.length > 0 && (
              <p className="text-xs font-mono text-matte-stone/30 pb-0.5">
                {pagination?.totalGigs ?? gigs.length} gigs available
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Search bar ── */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-matte-stone/30 z-10 pointer-events-none" />
              <input
                type="text"
                placeholder="Search gigs by title or skills…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-md bg-matte-surface border border-matte-divider text-sm text-matte-bone placeholder-matte-stone/25 focus:outline-none focus:border-brand-emerald/50 focus:ring-2 focus:ring-brand-emerald/12 transition-all min-h-[44px]"
              />
            </div>
            <Button type="submit" variant="primary">Search</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? 'text-brand-emerald' : ''}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </form>

          {/* Filter panel */}
          {showFilters && (
            <div className="mt-3 bg-matte-surface border border-matte-divider rounded-xl p-5 animate-slide-down">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-matte-stone/40">Budget Range</p>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-matte-stone/30 hover:text-matte-stone/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  type="number"
                  placeholder="Min ($)"
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max ($)"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                />
                <Button onClick={handleSearch} variant="primary" fullWidth>
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* ── Gig Grid ── */}
        {gigs.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No gigs found"
            description="Try adjusting your search or filters to find more gigs."
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gigs.map((gig) => (
                <Link key={gig._id} to={`/gigs/${gig._id}`} className="block group">
                  <div className="bg-matte-surface border border-matte-divider rounded-xl overflow-hidden h-full flex flex-col hover:border-matte-surface-raised hover:-translate-y-[1px] transition-all duration-200">
                    {/* Card header — budget prominent */}
                    <div className="px-5 py-4 border-b border-matte-divider flex items-center justify-between">
                      <Badge variant={getStatusVariant(gig.status)} size="sm">
                        {gig.status}
                      </Badge>
                      <span
                        className="text-lg font-mono font-bold"
                        style={{ color: 'var(--color-brass)' }}
                      >
                        ${gig.budget}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="p-5 flex-1 flex flex-col gap-3">
                      <h3 className="text-sm font-display font-bold text-matte-bone leading-snug line-clamp-2 group-hover:text-brand-emerald-light transition-colors">
                        {gig.title}
                      </h3>
                      <p className="text-xs text-matte-stone/40 leading-relaxed line-clamp-3 flex-1">
                        {gig.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5">
                        {gig.skills?.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="primary" size="sm">{skill}</Badge>
                        ))}
                        {gig.skills?.length > 3 && (
                          <Badge variant="default" size="sm">+{gig.skills.length - 3}</Badge>
                        )}
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="px-5 py-3.5 border-t border-matte-divider flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-brand-emerald/12 border border-brand-emerald/15 rounded-full flex items-center justify-center text-brand-emerald text-[10px] font-bold">
                          {gig.client?.name?.charAt(0) || 'C'}
                        </div>
                        <span className="text-xs font-medium text-matte-stone/45 truncate max-w-[100px]">
                          {gig.client?.name || 'Client'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-matte-stone/30 font-medium">
                        {gig.deadline && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(gig.deadline).toLocaleDateString()}
                          </span>
                        )}
                        <span>{gig.bids?.length || 0} bids</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-9 h-9 rounded-md text-sm font-semibold transition-all duration-150 ${
                      page === pagination.currentPage
                        ? 'btn-glass-primary'
                        : 'bg-matte-surface border border-matte-divider text-matte-stone/50 hover:text-matte-bone hover:border-matte-stone/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GigList;
