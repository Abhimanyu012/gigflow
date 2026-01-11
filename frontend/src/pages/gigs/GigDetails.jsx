import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowLeft,
  DollarSign,
  Calendar,
  User,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchGigById } from '../../store/slices/gigSlice';
import { createBid, hireBid } from '../../store/slices/bidSlice';
import {
  Card,
  Badge,
  Button,
  Input,
  Textarea,
  LoadingScreen,
  Alert,
} from '../../components/ui';

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentGig, isLoading } = useSelector((state) => state.gigs);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { isLoading: bidLoading } = useSelector((state) => state.bids);

  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [deliveryDays, setDeliveryDays] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchGigById(id));
    }
  }, [dispatch, id]);

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to place a bid');
      navigate('/login');
      return;
    }

    if (user.role !== 'freelancer') {
      toast.error('Only freelancers can place bids');
      return;
    }

    if (!bidAmount || !bidMessage || !deliveryDays) {
      toast.error('Please fill all fields');
      return;
    }

    const result = await dispatch(createBid({
      gigId: id,
      price: Number(bidAmount),
      message: bidMessage,
    }));

    if (!result.error) {
      toast.success('Bid placed successfully!');
      setBidAmount('');
      setBidMessage('');
      setDeliveryDays('');
      dispatch(fetchGigById(id));
    }
  };

  const handleHire = async (bidId) => {
    const result = await dispatch(hireBid(bidId));
    if (!result.error) {
      toast.success('Freelancer hired successfully!');
      dispatch(fetchGigById(id));
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

  const getBidStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      hired: 'success',
      rejected: 'danger',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!currentGig) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Alert
          type="error"
          title="Gig not found"
          message="The gig you're looking for doesn't exist or has been removed."
        />
        <Link to="/gigs" className="mt-4 inline-block">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4" />
            Back to Gigs
          </Button>
        </Link>
      </div>
    );
  }

  const isClient = user?._id === currentGig.ownerId?._id;
  const isFreelancer = user?.role === 'freelancer';
  const hasAlreadyBid = currentGig.bids?.some(
    (bid) => bid.freelancerId?._id === user?._id
  );
  const canBid = isAuthenticated && isFreelancer && !isClient && !hasAlreadyBid && currentGig.status === 'open';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link to="/gigs" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Gigs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gig Header */}
          <Card>
            <Card.Content>
              <div className="flex items-start justify-between mb-4">
                {getStatusBadge(currentGig.status)}
                <span className="text-sm text-gray-400">
                  Posted {new Date(currentGig.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {currentGig.title}
              </h1>
              <p className="text-gray-600 whitespace-pre-wrap">
                {currentGig.description}
              </p>

              {/* Skills */}
              {currentGig.skills?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentGig.skills.map((skill, idx) => (
                      <Badge key={idx} variant="primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card.Content>
          </Card>

          {/* Bids Section */}
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                Bids ({currentGig.bids?.length || 0})
              </h2>
            </Card.Header>
            <Card.Content className="space-y-4">
              {currentGig.bids?.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No bids yet</p>
              ) : (
                currentGig.bids?.map((bid) => (
                  <div
                    key={bid._id}
                    className={`p-4 rounded-lg border ${
                      bid.status === 'hired' ? 'border-green-300 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                          {bid.freelancerId?.name?.charAt(0) || 'F'}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {bid.freelancerId?.name || 'Freelancer'}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {bid.freelancerId?.email}
                          </p>
                        </div>
                      </div>
                      {getBidStatusBadge(bid.status)}
                    </div>
                    <p className="text-gray-600 mb-3">{bid.message}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1 text-green-600">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-semibold">${bid.price}</span>
                      </div>
                    </div>

                    {/* Hire Button for Client */}
                    {isClient && bid.status === 'pending' && currentGig.status === 'open' && (
                      <div className="mt-4">
                        <Button
                          size="sm"
                          variant="success"
                          isLoading={bidLoading}
                          onClick={() => handleHire(bid._id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                          Hire This Freelancer
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </Card.Content>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Gig Info Card */}
          <Card>
            <Card.Content className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Budget</span>
                <span className="text-2xl font-bold text-indigo-600">
                  ${currentGig.budget}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-400">Deadline</p>
                  <p className="font-medium">
                    {currentGig.deadline
                      ? new Date(currentGig.deadline).toLocaleDateString()
                      : 'Flexible'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <User className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-400">Client</p>
                  <p className="font-medium">{currentGig.ownerId?.name || 'Client'}</p>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Bid Form */}
          {canBid && (
            <Card>
              <Card.Header>
                <h3 className="font-semibold">Place Your Bid</h3>
              </Card.Header>
              <Card.Content>
                <form onSubmit={handleSubmitBid} className="space-y-4">
                  <Input
                    type="number"
                    placeholder="Bid Amount ($)"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Delivery Time (days)"
                    value={deliveryDays}
                    onChange={(e) => setDeliveryDays(e.target.value)}
                  />
                  <Textarea
                    placeholder="Write your proposal..."
                    value={bidMessage}
                    onChange={(e) => setBidMessage(e.target.value)}
                    rows={4}
                  />
                  <Button type="submit" fullWidth isLoading={bidLoading}>
                    <Send className="w-4 h-4" />
                    Submit Bid
                  </Button>
                </form>
              </Card.Content>
            </Card>
          )}

          {/* Already Bid Message */}
          {hasAlreadyBid && (
            <Alert
              type="info"
              title="You've already placed a bid"
              message="You can view your bid in the bids section."
            />
          )}

          {/* Login Prompt */}
          {!isAuthenticated && (
            <Card>
              <Card.Content className="text-center py-6">
                <AlertCircle className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Want to bid on this gig?</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Login or create an account to place your bid
                </p>
                <Link to="/login">
                  <Button fullWidth>Sign In</Button>
                </Link>
              </Card.Content>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default GigDetails;
