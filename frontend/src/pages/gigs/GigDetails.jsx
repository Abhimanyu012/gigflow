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

  const getStatusVariant = (status) =>
    ({ open: 'success', 'in-progress': 'warning', completed: 'info', cancelled: 'danger' }[status] || 'default');

  const getBidStatusVariant = (status) =>
    ({ pending: 'warning', hired: 'success', rejected: 'danger' }[status] || 'default');

  if (isLoading) return <LoadingScreen />;

  if (!currentGig) {
    return (
      <div className="min-h-screen bg-matte-charcoal">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Alert type="error" title="Gig not found" message="The gig you're looking for doesn't exist or has been removed." />
          <Link to="/gigs" className="mt-4 inline-block">
            <Button variant="secondary">
              <ArrowLeft className="w-4 h-4" />
              Back to Gigs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user?._id === currentGig.ownerId?._id;
  const hasAlreadyBid = currentGig.bids?.some((bid) => bid.freelancerId?._id === user?._id);
  const canBid = isAuthenticated && !isOwner && !hasAlreadyBid && currentGig.status === 'open';

  return (
    <div className="min-h-screen bg-matte-charcoal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link
          to="/gigs"
          className="inline-flex items-center gap-2 text-sm text-matte-stone/40 hover:text-matte-stone/80 transition-colors mb-7 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse Gigs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {/* ── Main column ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Gig header card */}
            <div className="bg-matte-surface border border-matte-divider rounded-xl p-7">
              <div className="flex items-start justify-between mb-5">
                <Badge variant={getStatusVariant(currentGig.status)}>{currentGig.status}</Badge>
                <span className="text-xs text-matte-stone/30 font-medium">
                  Posted {new Date(currentGig.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-display font-extrabold text-matte-bone tracking-tight mb-4 leading-tight">
                {currentGig.title}
              </h1>
              <p className="text-sm text-matte-stone/55 whitespace-pre-wrap leading-relaxed">
                {currentGig.description}
              </p>

              {currentGig.skills?.length > 0 && (
                <div className="mt-7 pt-6 border-t border-matte-divider">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-matte-stone/30 mb-3">
                    Required Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentGig.skills.map((skill, idx) => (
                      <Badge key={idx} variant="primary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bids section */}
            <div className="bg-matte-surface border border-matte-divider rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-matte-divider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-brand-emerald" />
                <h2 className="text-sm font-display font-bold text-matte-bone">
                  Bids ({currentGig.bids?.length || 0})
                </h2>
              </div>

              {currentGig.bids?.length === 0 ? (
                <p className="text-sm text-matte-stone/35 text-center py-10">No bids yet.</p>
              ) : (
                <div className="divide-y divide-matte-divider">
                  {currentGig.bids?.map((bid) => (
                    <div
                      key={bid._id}
                      className={`p-6 ${bid.status === 'hired' ? 'bg-brand-emerald/5' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-brand-emerald/10 border border-brand-emerald/15 rounded-full flex items-center justify-center text-brand-emerald font-bold shrink-0">
                            {bid.freelancerId?.name?.charAt(0) || 'F'}
                          </div>
                          <div>
                            <h4 className="text-sm font-display font-bold text-matte-bone">
                              {bid.freelancerId?.name || 'Freelancer'}
                            </h4>
                            <p className="text-xs text-matte-stone/35 mt-0.5">{bid.freelancerId?.email}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span
                            className="text-lg font-mono font-bold"
                            style={{ color: 'var(--color-brass)' }}
                          >
                            ${bid.price}
                          </span>
                          <Badge variant={getBidStatusVariant(bid.status)} size="sm">
                            {bid.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Pull-quote message */}
                      <div className="border-l-2 border-matte-divider pl-3 mt-3">
                        <p className="text-sm text-matte-stone/55 leading-relaxed">{bid.message}</p>
                      </div>

                      {/* Hire button for owner */}
                      {isOwner && bid.status === 'pending' && currentGig.status === 'open' && (
                        <div className="mt-4">
                          <Button
                            id={`hire-btn-${bid._id}`}
                            size="sm"
                            variant="primary"
                            isLoading={bidLoading}
                            onClick={() => handleHire(bid._id)}
                          >
                            <CheckCircle className="w-4 h-4" />
                            Hire This Freelancer
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Sticky sidebar ── */}
          <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            {/* Gig info */}
            <div className="bg-matte-surface border border-matte-divider rounded-xl overflow-hidden">
              {/* Budget highlight */}
              <div className="px-6 py-5 bg-matte-charcoal border-b border-matte-divider flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-matte-stone/35">Budget</p>
                <span
                  className="text-2xl font-mono font-bold"
                  style={{ color: 'var(--color-brass)' }}
                >
                  ${currentGig.budget}
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 bg-matte-charcoal rounded-lg border border-matte-divider flex items-center justify-center">
                    <Calendar className="w-3.5 h-3.5 text-matte-stone/35" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest font-semibold text-matte-stone/30 mb-0.5">Deadline</p>
                    <p className="text-sm font-display font-semibold text-matte-bone">
                      {currentGig.deadline
                        ? new Date(currentGig.deadline).toLocaleDateString()
                        : 'Flexible'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 bg-matte-charcoal rounded-lg border border-matte-divider flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-matte-stone/35" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest font-semibold text-matte-stone/30 mb-0.5">Client</p>
                    <p className="text-sm font-display font-semibold text-matte-bone">
                      {currentGig.ownerId?.name || 'Client'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bid form */}
            {canBid && (
              <div className="bg-matte-surface border border-matte-divider rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-matte-divider">
                  <h3 className="text-sm font-display font-bold text-matte-bone">Place Your Bid</h3>
                </div>
                <div className="p-5">
                  <form onSubmit={handleSubmitBid} className="space-y-4">
                    <Input
                      id="bid-amount"
                      type="number"
                      label="Bid Amount ($)"
                      placeholder="500"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                    <Input
                      id="bid-delivery"
                      type="number"
                      label="Delivery Time (days)"
                      placeholder="14"
                      value={deliveryDays}
                      onChange={(e) => setDeliveryDays(e.target.value)}
                    />
                    <Textarea
                      id="bid-message"
                      label="Proposal"
                      placeholder="Describe your approach and why you're the best fit…"
                      value={bidMessage}
                      onChange={(e) => setBidMessage(e.target.value)}
                      rows={4}
                    />
                    <Button
                      id="bid-submit-btn"
                      type="submit"
                      variant="primary"
                      fullWidth
                      isLoading={bidLoading}
                    >
                      <Send className="w-4 h-4" />
                      Submit Bid
                    </Button>
                  </form>
                </div>
              </div>
            )}

            {/* Already bid */}
            {hasAlreadyBid && (
              <Alert type="info" title="Bid submitted" message="You've already placed a bid on this gig." />
            )}

            {/* Login prompt */}
            {!isAuthenticated && (
              <div className="bg-matte-surface border border-matte-divider rounded-xl p-6 text-center">
                <div className="w-11 h-11 bg-brand-emerald/10 border border-brand-emerald/15 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-5 h-5 text-brand-emerald" />
                </div>
                <h3 className="font-display font-bold text-matte-bone mb-1.5 text-sm">Want to bid?</h3>
                <p className="text-matte-stone/40 text-xs mb-4 leading-relaxed">
                  Log in or create an account to place your bid on this gig.
                </p>
                <Link to="/login">
                  <Button variant="primary" fullWidth>Sign In to Bid</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetails;
