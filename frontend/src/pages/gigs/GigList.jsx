import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, Filter, DollarSign, Calendar, MapPin, Briefcase } from 'lucide-react';
import { fetchGigs, searchGigs } from '../../store/slices/gigSlice';
import { Card, Badge, Button, Input, LoadingScreen, EmptyState } from '../../components/ui';

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

  const getStatusBadge = (status) => {
    const variants = {
      open: 'success',
      'in-progress': 'warning',
      completed: 'info',
      cancelled: 'danger',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  if (isLoading && gigs.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Gigs</h1>
        <p className="text-gray-500">Find the perfect project to work on</p>
      </div>

      {/* Search & Filters */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search gigs by title or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11"
            />
          </div>
          <Button type="submit">Search</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </form>

        {/* Filter Panel */}
        {showFilters && (
          <Card className="mt-4 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                type="number"
                placeholder="Min Budget"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max Budget"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
              />
              <Button onClick={handleSearch} fullWidth>
                Apply Filters
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Gig List */}
      {gigs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No gigs found"
          description="Try adjusting your search or filters to find more gigs."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <Link key={gig._id} to={`/gigs/${gig._id}`}>
                <Card hover className="h-full flex flex-col">
                  <Card.Content className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      {getStatusBadge(gig.status)}
                      <span className="text-xs text-gray-400">
                        {new Date(gig.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {gig.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                      {gig.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {gig.skills?.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="primary" size="sm">
                          {skill}
                        </Badge>
                      ))}
                      {gig.skills?.length > 3 && (
                        <Badge variant="default" size="sm">
                          +{gig.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>${gig.budget}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{gig.deadline ? new Date(gig.deadline).toLocaleDateString() : 'Flexible'}</span>
                      </div>
                    </div>
                  </Card.Content>

                  <Card.Footer className="bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {gig.client?.name?.charAt(0) || 'C'}
                      </div>
                      <span className="text-sm text-gray-600">{gig.client?.name || 'Client'}</span>
                    </div>
                    <span className="text-xs text-gray-400">{gig.bids?.length || 0} bids</span>
                  </Card.Footer>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === pagination.currentPage ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GigList;
