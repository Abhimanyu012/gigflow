import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, ArrowLeft, DollarSign, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { createGig, clearError } from '../../store/slices/gigSlice';
import { Card, Button, Input, Textarea, Alert } from '../../components/ui';

const createGigSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  budget: z.string().min(1, 'Budget is required').transform(Number),
  skills: z.string().min(1, 'At least one skill is required'),
  deadline: z.string().optional(),
});

const CreateGig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.gigs);
  const { user } = useSelector((state) => state.auth);

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

  // Check if user is client
  if (user?.role !== 'client') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Alert
          type="warning"
          title="Access Denied"
          message="Only clients can create gigs. Please switch to a client account."
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <Card>
        <Card.Header>
          <h1 className="text-2xl font-bold text-gray-900">Post a New Gig</h1>
          <p className="text-gray-500 mt-1">
            Describe your project to attract the best freelancers
          </p>
        </Card.Header>

        <Card.Content>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <Input
                {...register('title')}
                label="Gig Title"
                placeholder="e.g., Build a responsive e-commerce website"
                error={errors.title?.message}
              />
            </div>

            {/* Description */}
            <div>
              <Textarea
                {...register('description')}
                label="Description"
                placeholder="Describe your project in detail. Include requirements, expected deliverables, and any specific instructions..."
                rows={6}
                error={errors.description?.message}
              />
            </div>

            {/* Budget & Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Budget ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    {...register('budget')}
                    type="number"
                    placeholder="500"
                    className="pl-11"
                    error={errors.budget?.message}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Deadline (Optional)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    {...register('deadline')}
                    type="date"
                    className="pl-11"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <Input
                {...register('skills')}
                label="Required Skills"
                placeholder="e.g., React, Node.js, MongoDB (comma separated)"
                error={errors.skills?.message}
              />
              <p className="text-xs text-gray-400 mt-1">
                Separate skills with commas
              </p>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button type="submit" fullWidth isLoading={isLoading} size="lg">
                <Plus className="w-5 h-5" />
                Post Gig
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
};

export default CreateGig;
