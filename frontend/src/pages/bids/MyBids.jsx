import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  ExternalLink,
} from 'lucide-react';
import { fetchMyBids } from '../../store/slices/bidSlice';
import {
  Card,
  Badge,
  Button,
  LoadingScreen,
  EmptyState,
} from '../../components/ui';

const MyBids = () => {
  const dispatch = useDispatch();
  const { myBids, isLoading } = useSelector((state) => state.bids);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMyBids());
  }, [dispatch]);

  const getBidStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      hired: 'success',
      rejected: 'danger',
    };
    const icons = {
      pending: Clock,
      hired: CheckCircle,
      rejected: XCircle,
    };
    const Icon = icons[status] || Clock;
    return (
      <Badge variant={variants[status] || 'default'}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getGigStatusBadge = (status) => {
    const variants = {
      open: 'success',
      'in-progress': 'warning',
      completed: 'info',
      cancelled: 'danger',
    };
    return <Badge variant={variants[status] || 'default'} size="sm">{status}</Badge>;
  };

  if (isLoading && myBids.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bids</h1>
        <p className="text-gray-500">Track and manage your submitted proposals</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <Card.Content className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {myBids.filter((b) => b.status === 'pending').length}
              </p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {myBids.filter((b) => b.status === 'accepted').length}
              </p>
              <p className="text-sm text-gray-500">Accepted</p>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ${myBids.filter((b) => b.status === 'accepted').reduce((sum, b) => sum + b.amount, 0)}
              </p>
              <p className="text-sm text-gray-500">Total Earned</p>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Bids List */}
      {myBids.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No bids yet"
          description="Start bidding on gigs to get hired by clients."
          action={() => window.location.href = '/gigs'}
          actionLabel="Browse Gigs"
        />
      ) : (
        <div className="space-y-4">
          {myBids.map((bid) => (
            <Card key={bid._id} hover>
              <Card.Content>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getBidStatusBadge(bid.status)}
                      {bid.gigId && getGigStatusBadge(bid.gigId.status)}
                      <span className="text-sm text-gray-400">
                        Submitted {new Date(bid.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <Link to={`/gigs/${bid.gigId?._id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                        {bid.gigId?.title || 'Gig Title'}
                      </h3>
                    </Link>

                    <p className="text-gray-500 mt-2 line-clamp-2">{bid.message}</p>
                  </div>

                  {/* Bid Details */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-indigo-600">${bid.price}</p>
                        <p className="text-xs text-gray-400">Your Bid</p>
                      </div>
                    </div>

                    <Link to={`/gigs/${bid.gigId?._id}`}>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4" />
                        View Gig
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Client Info */}
                {bid.gigId?.ownerId && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {bid.gigId.ownerId.name?.charAt(0) || 'C'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {bid.gigId.ownerId.name}
                      </p>
                      <p className="text-xs text-gray-500">Client</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ${bid.gigId.budget}
                      </p>
                      <p className="text-xs text-gray-500">Gig Budget</p>
                    </div>
                  </div>
                )}
              </Card.Content>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBids;
