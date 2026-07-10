import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  DollarSign,
  Calendar,
  MessageSquare,
  Briefcase,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchMyGigs, deleteGig } from '../../store/slices/gigSlice';
import { Badge, Button, LoadingScreen, EmptyState } from '../../components/ui';

const MyGigs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myGigs, isLoading } = useSelector((state) => state.gigs);

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

  const getStatusVariant = (status) =>
    ({ open: 'success', 'in-progress': 'warning', completed: 'info', cancelled: 'danger' }[status] || 'default');

  if (isLoading && myGigs.length === 0) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-matte-charcoal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-matte-stone/35 mb-1">
              My listings
            </p>
            <h1 className="text-2xl md:text-3xl font-display font-extrabold text-matte-bone tracking-tight">
              My Gigs
            </h1>
          </div>
          <Link to="/gigs/create">
            <Button variant="primary">
              <Plus className="w-4 h-4" />
              Post New Gig
            </Button>
          </Link>
        </div>

        {myGigs.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No gigs posted yet"
            description="Post your first gig to start hiring freelancers."
            action={() => navigate('/gigs/create')}
            actionLabel="Post a Gig"
          />
        ) : (
          <div className="space-y-4">
            {myGigs.map((gig) => (
              <div
                key={gig._id}
                className="bg-matte-surface border border-matte-divider rounded-xl overflow-hidden hover:border-matte-surface-raised transition-all duration-200"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-5">
                    {/* Left: content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant={getStatusVariant(gig.status)} size="sm">
                          {gig.status}
                        </Badge>
                        <span className="text-xs text-matte-stone/30 font-medium">
                          {new Date(gig.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <Link to={`/gigs/${gig._id}`}>
                        <h3 className="text-base font-display font-bold text-matte-bone hover:text-brand-emerald-light transition-colors leading-snug mb-2">
                          {gig.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-matte-stone/40 line-clamp-2 leading-relaxed mb-3">
                        {gig.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {gig.skills?.slice(0, 4).map((skill, idx) => (
                          <Badge key={idx} variant="primary" size="sm">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Right: meta + actions */}
                    <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
                      {/* Brass budget */}
                      <span
                        className="text-xl font-mono font-bold"
                        style={{ color: 'var(--color-brass)' }}
                      >
                        ${gig.budget}
                      </span>

                      {/* Meta row */}
                      <div className="flex items-center gap-4 text-xs text-matte-stone/35 font-medium">
                        <span className="flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5" />
                          {gig.bids?.length || 0} bids
                        </span>
                        {gig.deadline && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(gig.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <Link to={`/gigs/${gig._id}`}>
                          <Button size="sm" variant="secondary">
                            <ExternalLink className="w-3.5 h-3.5" />
                            View Bids
                          </Button>
                        </Link>
                        {gig.status === 'open' && (
                          <Button
                            id={`delete-gig-${gig._id}`}
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(gig._id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hired freelancer strip */}
                {gig.hiredFreelancer && (
                  <div className="px-6 py-3.5 bg-brand-emerald/6 border-t border-brand-emerald/15 flex items-center gap-3">
                    <div className="w-7 h-7 bg-brand-emerald/15 border border-brand-emerald/20 rounded-full flex items-center justify-center text-brand-emerald text-xs font-bold">
                      {gig.hiredFreelancer.name?.charAt(0) || 'F'}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-brand-emerald-light">Hired: </span>
                      <span className="text-xs font-medium text-matte-stone/60">{gig.hiredFreelancer.name}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGigs;
