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
import { Badge, Button, LoadingScreen, EmptyState } from '../../components/ui';

const MyBids = () => {
  const dispatch = useDispatch();
  const { myBids, isLoading } = useSelector((state) => state.bids);

  useEffect(() => {
    dispatch(fetchMyBids());
  }, [dispatch]);

  const getBidStatusIcon = (status) => {
    const icons = { pending: Clock, hired: CheckCircle, rejected: XCircle };
    return icons[status] || Clock;
  };

  const getBidStatusVariant = (status) =>
    ({ pending: 'warning', hired: 'success', rejected: 'danger' }[status] || 'default');

  const getGigStatusVariant = (status) =>
    ({ open: 'success', 'in-progress': 'warning', completed: 'info', cancelled: 'danger' }[status] || 'default');

  if (isLoading && myBids.length === 0) return <LoadingScreen />;

  const pending  = myBids.filter((b) => b.status === 'pending').length;
  const accepted = myBids.filter((b) => b.status === 'accepted').length;
  const earned   = myBids.filter((b) => b.status === 'accepted').reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="min-h-screen bg-matte-charcoal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-sans font-semibold uppercase tracking-widest text-matte-stone/35 mb-1">
            My proposals
          </p>
          <h1 className="text-2xl md:text-3xl font-display font-extrabold text-matte-bone tracking-tight">
            My Bids
          </h1>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Clock, value: pending, label: 'Pending' },
            { icon: CheckCircle, value: accepted, label: 'Accepted' },
            { icon: DollarSign, value: `$${earned}`, label: 'Earned', mono: true },
          ].map(({ icon: Icon, value, label, mono }) => (
            <div key={label} className="bg-matte-surface border border-matte-divider rounded-xl p-4 border-l-2 border-l-brand-emerald/35">
              <p
                className={`text-xl font-bold leading-none mb-1.5 ${mono ? '' : 'font-mono'}`}
                style={{ color: 'var(--color-brass)', fontFamily: 'var(--font-mono)' }}
              >
                {value}
              </p>
              <div className="flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-matte-stone/30" />
                <p className="text-[10px] font-semibold uppercase tracking-wider text-matte-stone/35">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bids list */}
        {myBids.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No bids yet"
            description="Start bidding on gigs to get hired by clients."
            action={() => (window.location.href = '/gigs')}
            actionLabel="Browse Gigs"
          />
        ) : (
          <div className="space-y-4">
            {myBids.map((bid) => {
              const StatusIcon = getBidStatusIcon(bid.status);
              return (
                <div
                  key={bid._id}
                  className="bg-matte-surface border border-matte-divider rounded-xl overflow-hidden hover:border-matte-surface-raised transition-all duration-200"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                      {/* Left: bid info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5 mb-3">
                          <Badge variant={getBidStatusVariant(bid.status)} size="sm">
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {bid.status}
                          </Badge>
                          {bid.gigId && (
                            <Badge variant={getGigStatusVariant(bid.gigId.status)} size="sm">
                              {bid.gigId.status}
                            </Badge>
                          )}
                          <span className="text-[11px] text-matte-stone/30 font-medium">
                            Submitted {new Date(bid.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <Link to={`/gigs/${bid.gigId?._id}`}>
                          <h3 className="text-base font-display font-bold text-matte-bone hover:text-brand-emerald-light transition-colors leading-snug mb-2">
                            {bid.gigId?.title || 'Gig Title'}
                          </h3>
                        </Link>

                        {/* Pull-quote message */}
                        <div className="border-l-2 border-matte-divider pl-3 mt-2">
                          <p className="text-sm text-matte-stone/40 line-clamp-2 leading-relaxed">{bid.message}</p>
                        </div>
                      </div>

                      {/* Right: price + action */}
                      <div className="flex flex-row lg:flex-col items-center lg:items-end gap-4 shrink-0">
                        <div className="text-right">
                          <p
                            className="text-2xl font-mono font-bold"
                            style={{ color: 'var(--color-brass)' }}
                          >
                            ${bid.price}
                          </p>
                          <p className="text-[10px] text-matte-stone/30 font-medium mt-0.5">Your bid</p>
                        </div>
                        <Link to={`/gigs/${bid.gigId?._id}`}>
                          <Button size="sm" variant="secondary">
                            <ExternalLink className="w-3.5 h-3.5" />
                            View Gig
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Client footer strip */}
                  {bid.gigId?.ownerId && (
                    <div className="px-6 py-3.5 bg-matte-charcoal border-t border-matte-divider flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 bg-brand-emerald/10 border border-brand-emerald/15 rounded-full flex items-center justify-center text-brand-emerald text-[10px] font-bold">
                          {bid.gigId.ownerId.name?.charAt(0) || 'C'}
                        </div>
                        <div>
                          <span className="text-xs font-medium text-matte-stone/50">{bid.gigId.ownerId.name}</span>
                          <span className="text-[11px] text-matte-stone/25 ml-1">· Client</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className="text-sm font-mono font-semibold"
                          style={{ color: 'var(--color-brass)', opacity: 0.7 }}
                        >
                          ${bid.gigId.budget}
                        </p>
                        <p className="text-[10px] text-matte-stone/25">Gig budget</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBids;
