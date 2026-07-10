import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, DollarSign, Calendar, Lightbulb } from 'lucide-react';
import toast from 'react-hot-toast';
import { createGig, clearError } from '../../store/slices/gigSlice';
import { Button, Input, Textarea, Alert } from '../../components/ui';

const createGigSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  budget: z.string().min(1, 'Budget is required').transform(Number),
  skills: z.string().min(1, 'At least one skill is required'),
  deadline: z.string().optional(),
});

const tips = [
  { title: 'Be specific', body: 'Clear project titles get 40% more bids. Describe exactly what you need.' },
  { title: 'Set a fair budget', body: 'Research market rates for your skill category to attract quality freelancers.' },
  { title: 'List all skills', body: 'Comma-separate all required technologies so the right people find your gig.' },
  { title: 'Add a deadline', body: 'Gigs with deadlines signal seriousness and help freelancers plan their work.' },
];

const CreateGig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.gigs);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createGigSchema),
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = async (data) => {
    const gigData = {
      ...data,
      skills: data.skills.split(',').map((s) => s.trim()).filter(Boolean),
      deadline: data.deadline || undefined,
    };

    const result = await dispatch(createGig(gigData));
    if (!result.error) {
      toast.success('Gig created successfully!');
      navigate('/my-gigs');
    }
  };

  return (
    <div className="min-h-screen bg-matte-charcoal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-matte-stone/40 hover:text-matte-stone/80 transition-colors mb-7 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Page title */}
        <div className="mb-8">
          <p className="text-xs font-sans font-semibold uppercase tracking-widest text-matte-stone/35 mb-1">
            New listing
          </p>
          <h1 className="text-2xl md:text-3xl font-display font-extrabold text-matte-bone tracking-tight">
            Post a New Gig
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Form ── */}
          <div className="lg:col-span-2">
            <div className="bg-matte-surface border border-matte-divider rounded-xl overflow-hidden">
              <div className="px-7 py-5 border-b border-matte-divider">
                <h2 className="text-sm font-display font-bold text-matte-bone">Gig Details</h2>
                <p className="text-xs text-matte-stone/35 mt-0.5">
                  Describe your project to attract the best freelancers.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-7 space-y-6">
                <Input
                  {...register('title')}
                  id="gig-title"
                  label="Gig Title"
                  placeholder="e.g. Build a responsive e-commerce website"
                  error={errors.title?.message}
                />

                <Textarea
                  {...register('description')}
                  id="gig-description"
                  label="Description"
                  placeholder="Describe your project in detail. Include requirements, deliverables, and specific instructions…"
                  rows={6}
                  error={errors.description?.message}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-matte-stone/55 mb-1.5">
                      Budget ($)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-matte-stone/30 z-10 pointer-events-none" />
                      <Input
                        {...register('budget')}
                        id="gig-budget"
                        type="number"
                        placeholder="500"
                        className="pl-10"
                        error={errors.budget?.message}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-matte-stone/55 mb-1.5">
                      Deadline (Optional)
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-matte-stone/30 z-10 pointer-events-none" />
                      <Input
                        {...register('deadline')}
                        id="gig-deadline"
                        type="date"
                        className="pl-10"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>

                <Input
                  {...register('skills')}
                  id="gig-skills"
                  label="Required Skills"
                  placeholder="React, Node.js, MongoDB"
                  helper="Separate multiple skills with commas"
                  error={errors.skills?.message}
                />

                <div className="pt-2">
                  <Button
                    id="gig-submit-btn"
                    type="submit"
                    fullWidth
                    isLoading={isLoading}
                    size="lg"
                  >
                    Publish Gig
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* ── Tips pane (sticky) ── */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-matte-surface border border-matte-divider rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-matte-divider flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-brand-emerald" />
                <h3 className="text-sm font-display font-bold text-matte-bone">Writing tips</h3>
              </div>
              <div className="p-5 space-y-5">
                {tips.map(({ title, body }) => (
                  <div key={title}>
                    <p className="text-xs font-semibold text-matte-bone mb-1">{title}</p>
                    <p className="text-xs text-matte-stone/40 leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGig;
