import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  DollarSign,
  Calendar,
  MessageSquare,
  Briefcase,
  Edit,
  Trash2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchMyGigs, deleteGig } from '../../store/slices/gigSlice';
import {
  Card,
  Badge,
  Button,
  LoadingScreen,
  EmptyState,
} from '../../components/ui';

const MyGigs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myGigs, isLoading } = useSelector((state) => state.gigs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMyGigs());
  }, [dispatch]);

  const handleDelete = async (gigId) => {
    if (window.confirm('Are you sure you want to delete this gig?')) {
      const result = await dispatch(deleteGig(gigId));
      if (!result.error) {
        toast.success('Gig deleted successfully');
      }
    }
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

  if (isLoading && myGigs.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Gigs</h1>
          <p className="text-gray-500">
            {user?.role === 'client'
              ? 'Manage your posted gigs'
              : 'View gigs you are working on'}
          </p>
        </div>
        {user?.role === 'client' && (
          <Link to="/gigs/create">
            <Button>
              <Plus className="w-4 h-4" />
              Post New Gig
            </Button>
          </Link>
        )}
      </div>

      {/* Gig List */}
      {myGigs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title={user?.role === 'client' ? 'No gigs posted yet' : 'No active gigs'}
          description={
            user?.role === 'client'
              ? 'Post your first gig to start hiring freelancers.'
              : 'Browse available gigs and start bidding.'
          }
          action={() => navigate(user?.role === 'client' ? '/gigs/create' : '/gigs')}
          actionLabel={user?.role === 'client' ? 'Post a Gig' : 'Browse Gigs'}
        />
      ) : (
        <div className="space-y-4">
          {myGigs.map((gig) => (
            <Card key={gig._id} hover>
              <Card.Content>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusBadge(gig.status)}
                      <span className="text-sm text-gray-400">
                        {new Date(gig.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Link to={`/gigs/${gig._id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                        {gig.title}
                      </h3>
                    </Link>
                    <p className="text-gray-500 mt-1 line-clamp-2">
                      {gig.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {gig.skills?.slice(0, 4).map((skill, idx) => (
                        <Badge key={idx} variant="primary" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Meta & Actions */}
                  <div className="flex flex-col md:items-end gap-3">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-medium">${gig.budget}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{gig.bids?.length || 0} bids</span>
                      </div>
                      {gig.deadline && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(gig.deadline).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {user?.role === 'client' && (
                      <div className="flex items-center gap-2">
                        <Link to={`/gigs/${gig._id}`}>
                          <Button size="sm" variant="outline">
                            View Bids
                          </Button>
                        </Link>
                        {gig.status === 'open' && (
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(gig._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Hired Freelancer Info */}
                {gig.hiredFreelancer && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-linear-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {gig.hiredFreelancer.name?.charAt(0) || 'F'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Hired: {gig.hiredFreelancer.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {gig.hiredFreelancer.email}
                        </p>
                      </div>
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

export default MyGigs;
