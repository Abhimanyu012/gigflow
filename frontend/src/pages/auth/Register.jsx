import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserPlus, Mail, Lock, User, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import { registerUser, clearError } from '../../store/slices/authSlice';
import { Button, Input, Card } from '../../components/ui';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    role: z.enum(['client', 'freelancer']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'freelancer',
    },
  });

  const selectedRole = useWatch({ control, name: 'role' });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = (data) => {
    const { confirmPassword: _confirmPassword, ...registerData } = data;
    dispatch(registerUser(registerData));
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create account</h1>
          <p className="text-gray-500 mt-2">Join GigFlow and start your journey</p>
        </div>

        {/* Register Form */}
        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I want to...
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`
                    flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${
                      selectedRole === 'freelancer'
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <input
                    {...register('role')}
                    type="radio"
                    value="freelancer"
                    className="sr-only"
                  />
                  <div className="text-center">
                    <User className={`w-6 h-6 mx-auto mb-1 ${selectedRole === 'freelancer' ? 'text-indigo-600' : 'text-gray-400'}`} />
                    <span className={`text-sm font-medium ${selectedRole === 'freelancer' ? 'text-indigo-600' : 'text-gray-600'}`}>
                      Work as Freelancer
                    </span>
                  </div>
                </label>

                <label
                  className={`
                    flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${
                      selectedRole === 'client'
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <input
                    {...register('role')}
                    type="radio"
                    value="client"
                    className="sr-only"
                  />
                  <div className="text-center">
                    <Briefcase className={`w-6 h-6 mx-auto mb-1 ${selectedRole === 'client' ? 'text-indigo-600' : 'text-gray-400'}`} />
                    <span className={`text-sm font-medium ${selectedRole === 'client' ? 'text-indigo-600' : 'text-gray-600'}`}>
                      Hire Talent
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                {...register('name')}
                type="text"
                placeholder="Full name"
                className="pl-11"
                error={errors.name?.message}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                {...register('email')}
                type="email"
                placeholder="Email address"
                className="pl-11"
                error={errors.email?.message}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                {...register('password')}
                type="password"
                placeholder="Password"
                className="pl-11"
                error={errors.password?.message}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                {...register('confirmPassword')}
                type="password"
                placeholder="Confirm password"
                className="pl-11"
                error={errors.confirmPassword?.message}
              />
            </div>

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              className="mt-6"
            >
              <UserPlus className="w-4 h-4" />
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-indigo-600 font-medium hover:text-indigo-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
