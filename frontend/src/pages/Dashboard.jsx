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
} from 'lucide-react';
import { fetchMyGigs } from '../store/slices/gigSlice';
import { fetchMyBids } from '../store/slices/bidSlice';
import { Card, Badge, Button, LoadingScreen } from '../components/ui';

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-gray-500">
          {isClient
            ? "Here's an overview of your posted gigs and activities."
            : "Here's an overview of your bids and earnings."}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isClient ? (
          <>
            <Card>
              <Card.Content className="flex items-center gap-4">
                <div className="w-14 h-14 bg-linear-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalGigs}</p>
                  <p className="text-sm text-gray-500">Total Gigs</p>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content className="flex items-center gap-4">
                <div className="w-14 h-14 bg-linear-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stats.openGigs}</p>
                  <p className="text-sm text-gray-500">Open Gigs</p>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content className="flex items-center gap-4">
                <div className="w-14 h-14 bg-linear-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalBids}</p>
                  <p className="text-sm text-gray-500">Total Bids</p>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content className="flex items-center gap-4">
                <div className="w-14 h-14 bg-linear-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stats.completedGigs}</p>
                  <p className="text-sm text-gray-500">Completed</p>
                </div>
              </Card.Content>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <Card.Content className="flex items-center gap-4">
                <div className="w-14 h-14 bg-linear-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalBids}</p>
                  <p className="text-sm text-gray-500">Total Bids</p>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content className="flex items-center gap-4">
                <div className="w-14 h-14 bg-linear-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stats.pendingBids}</p>
                  <p className="text-sm text-gray-500">Pending</p>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content className="flex items-center gap-4">
                <div className="w-14 h-14 bg-linear-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stats.acceptedBids}</p>
                  <p className="text-sm text-gray-500">Accepted</p>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content className="flex items-center gap-4">
                <div className="w-14 h-14 bg-linear-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">${stats.totalEarnings}</p>
                  <p className="text-sm text-gray-500">Earnings</p>
                </div>
              </Card.Content>
            </Card>
          </>
        )}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <Card>
          <Card.Header>
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </Card.Header>
          <Card.Content className="space-y-3">
            {isClient ? (
              <>
                <Link to="/gigs/create" className="block">
                  <Button variant="primary" fullWidth className="justify-between">
                    Post a New Gig
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/my-gigs" className="block">
                  <Button variant="outline" fullWidth className="justify-between">
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
                  <Button variant="outline" fullWidth className="justify-between">
                    View My Bids
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </>
            )}
          </Card.Content>
        </Card>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <Card.Header className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {isClient ? 'Recent Gigs' : 'Recent Bids'}
              </h2>
              <Link
                to={isClient ? '/my-gigs' : '/my-bids'}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                View All
              </Link>
            </Card.Header>
            <Card.Content>
              {isClient ? (
                myGigs.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No gigs posted yet. Create your first gig to get started!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {myGigs.slice(0, 5).map((gig) => (
                      <Link
                        key={gig._id}
                        to={`/gigs/${gig._id}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {gig.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {gig.bids?.length || 0} bids • ${gig.budget}
                          </p>
                        </div>
                        <Badge
                          variant={
                            gig.status === 'open'
                              ? 'success'
                              : gig.status === 'in-progress'
                              ? 'warning'
                              : 'info'
                          }
                        >
                          {gig.status}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )
              ) : myBids.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No bids placed yet. Start bidding on gigs to get hired!
                </p>
              ) : (
                <div className="space-y-4">
                  {myBids.slice(0, 5).map((bid) => (
                    <Link
                      key={bid._id}
                      to={`/gigs/${bid.gigId?._id || bid.gigId}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {bid.gigId?.title || 'Gig'}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${bid.price}
                        </p>
                      </div>
                      <Badge
                        variant={
                          bid.status === 'hired'
                            ? 'success'
                            : bid.status === 'pending'
                            ? 'warning'
                            : 'danger'
                        }
                      >
                        {bid.status}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
