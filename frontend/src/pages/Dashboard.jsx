import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  FileText,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle,
  Users,
  Plus,
} from 'lucide-react';
import { fetchMyGigs } from '../store/slices/gigSlice';
import { fetchMyBids } from '../store/slices/bidSlice';
import { Badge, Button, LoadingScreen } from '../components/ui';

/* ── Stat Card (dark, brass numeral, emerald left border) ── */
const StatCard = ({ value, label, icon: Icon, prefix = '' }) => (
  <div className="bg-matte-surface border border-matte-divider rounded-xl p-5 border-l-2 border-l-brand-emerald/40">
    <p
      className="text-2xl font-mono font-bold tracking-tight leading-none mb-1.5"
      style={{ color: 'var(--color-brass)' }}
    >
      {prefix}{value}
    </p>
    <div className="flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5 text-matte-stone/30" />
      <p className="text-xs font-semibold uppercase tracking-wider text-matte-stone/40">{label}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myGigs, isLoading: gigsLoading } = useSelector((state) => state.gigs);
  const { myBids, isLoading: bidsLoading } = useSelector((state) => state.bids);

  useEffect(() => {
    if (user?.role === 'client') {
      dispatch(fetchMyGigs());
    } else {
      dispatch(fetchMyBids());
    }
  }, [dispatch, user?.role]);

  const isClient = user?.role === 'client';

  // Calculate stats
  const stats = isClient
    ? {
        totalGigs: myGigs.length,
        openGigs: myGigs.filter((g) => g.status === 'open').length,
        inProgressGigs: myGigs.filter((g) => g.status === 'in-progress').length,
        completedGigs: myGigs.filter((g) => g.status === 'completed').length,
        totalBids: myGigs.reduce((sum, g) => sum + (g.bids?.length || 0), 0),
        totalSpent: myGigs.filter((g) => g.status === 'completed').reduce((sum, g) => sum + g.budget, 0),
      }
    : {
        totalBids: myBids.length,
        pendingBids: myBids.filter((b) => b.status === 'pending').length,
        acceptedBids: myBids.filter((b) => b.status === 'hired').length,
        totalEarnings: myBids.filter((b) => b.status === 'hired').reduce((sum, b) => sum + b.price, 0),
      };

  if (gigsLoading || bidsLoading) {
    return <LoadingScreen />;
  }

  const getStatusVariant = (status) =>
    ({ open: 'success', 'in-progress': 'warning', completed: 'info', cancelled: 'danger' }[status] || 'default');

  const getBidVariant = (status) =>
    ({ hired: 'success', pending: 'warning', rejected: 'danger' }[status] || 'default');

  return (
    <div className="min-h-screen bg-matte-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Page header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-matte-stone/35 mb-1">
              {isClient ? 'Client workspace' : 'Freelancer workspace'}
            </p>
            <h1 className="text-2xl md:text-3xl font-display font-extrabold text-matte-bone tracking-tight">
              Welcome back, {user?.name?.split(' ')[0]}.
            </h1>
          </div>
          {isClient ? (
            <Link to="/gigs/create">
              <Button variant="primary">
                <Plus className="w-4 h-4" />
                Post a Gig
              </Button>
            </Link>
          ) : (
            <Link to="/gigs">
              <Button variant="primary">
                Browse Gigs
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {isClient ? (
            <>
              <StatCard value={stats.totalGigs}     label="Total Gigs"  icon={Briefcase} />
              <StatCard value={stats.openGigs}      label="Open"        icon={Clock} />
              <StatCard value={stats.totalBids}     label="Total Bids"  icon={Users} />
              <StatCard value={stats.completedGigs} label="Completed"   icon={CheckCircle} />
            </>
          ) : (
            <>
              <StatCard value={stats.totalBids}    label="Total Bids"  icon={FileText} />
              <StatCard value={stats.pendingBids}   label="Pending"     icon={Clock} />
              <StatCard value={stats.acceptedBids}  label="Accepted"    icon={CheckCircle} />
              <StatCard value={stats.totalEarnings} label="Earnings"    icon={DollarSign} prefix="$" />
            </>
          )}
        </div>

        {/* ── Activity + Quick Actions ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-matte-surface border border-matte-divider rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-matte-divider">
              <h2 className="text-sm font-display font-bold text-matte-bone tracking-tight">Quick Actions</h2>
            </div>
            <div className="p-5 space-y-3">
              {isClient ? (
                <>
                  <Link to="/gigs/create" className="block">
                    <Button variant="primary" fullWidth className="justify-between">
                      Post a New Gig
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/my-gigs" className="block">
                    <Button variant="secondary" fullWidth className="justify-between">
                      Manage My Gigs
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/gigs" className="block">
                    <Button variant="primary" fullWidth className="justify-between">
                      Browse Available Gigs
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/my-bids" className="block">
                    <Button variant="secondary" fullWidth className="justify-between">
                      View My Bids
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-matte-surface border border-matte-divider rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-matte-divider flex items-center justify-between">
              <h2 className="text-sm font-display font-bold text-matte-bone tracking-tight">
                {isClient ? 'Recent Gigs' : 'Recent Bids'}
              </h2>
              <Link
                to={isClient ? '/my-gigs' : '/my-bids'}
                className="text-[11px] font-semibold uppercase tracking-wider text-brand-emerald hover:text-brand-emerald-light transition-colors"
              >
                View All
              </Link>
            </div>

            {isClient ? (
              myGigs.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-sm text-matte-stone/35">No gigs posted yet.</p>
                  <Link to="/gigs/create" className="text-sm text-brand-emerald hover:underline mt-1 inline-block">
                    Create your first gig →
                  </Link>
                </div>
              ) : (
                <div>
                  {myGigs.slice(0, 5).map((gig, i) => (
                    <Link
                      key={gig._id}
                      to={`/gigs/${gig._id}`}
                      className={`flex items-center justify-between px-6 py-4 hover:bg-matte-charcoal transition-colors ${
                        i < myGigs.slice(0,5).length - 1 ? 'border-b border-matte-divider' : ''
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-semibold text-sm text-matte-bone truncate">
                          {gig.title}
                        </p>
                        <p className="text-xs text-matte-stone/35 font-medium mt-0.5">
                          {gig.bids?.length || 0} bids ·{' '}
                          <span className="font-mono" style={{ color: 'var(--color-brass)' }}>
                            ${gig.budget}
                          </span>
                        </p>
                      </div>
                      <Badge variant={getStatusVariant(gig.status)} size="sm">
                        {gig.status}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )
            ) : myBids.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-sm text-matte-stone/35">No bids placed yet.</p>
                <Link to="/gigs" className="text-sm text-brand-emerald hover:underline mt-1 inline-block">
                  Browse open gigs →
                </Link>
              </div>
            ) : (
              <div>
                {myBids.slice(0, 5).map((bid, i) => (
                  <Link
                    key={bid._id}
                    to={`/gigs/${bid.gigId?._id || bid.gigId}`}
                    className={`flex items-center justify-between px-6 py-4 hover:bg-matte-charcoal transition-colors ${
                      i < myBids.slice(0,5).length - 1 ? 'border-b border-matte-divider' : ''
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-semibold text-sm text-matte-bone truncate">
                        {bid.gigId?.title || 'Gig'}
                      </p>
                      <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--color-brass)' }}>
                        ${bid.price}
                      </p>
                    </div>
                    <Badge variant={getBidVariant(bid.status)} size="sm">
                      {bid.status}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
