import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Adminschema, countriesWithCodes } from '../polls/create_poll/helper/schema';
import { useUpdateAdmin } from '@/hooks/useUpdateAdmin';
import { Loader } from 'lucide-react';



type AdminProfileUpdate = z.infer<typeof Adminschema>;

const AdminProfileUpdateForm: React.FC = () => {
  document.title = 'Update Admin Data';
  const { mutate, isPending } = useUpdateAdmin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminProfileUpdate>({
    resolver: zodResolver(Adminschema),
  });

  const onSubmit = async (data: AdminProfileUpdate) => {
    try {
      await mutate(data)
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const fields: Array<keyof AdminProfileUpdate> = ['name', 'email', 'password'];

  return (
    <section className='w-full min-h-[80vh] h-full flex items-center justify-center '>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="max-w-md w-full mx-auto p-8 bg-white dark:bg-[#131317] shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Update Profile</h2>

        {fields.map((field) => (
          <div className="mb-6" key={field}>
            <label className="block text-sm font-medium  mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
              {...register(field)}
              className={`mt-1 block w-full border ${
                errors[field] ? 'border-red-500' : 'border'
              } rounded-md shadow-sm  dark:bg-black p-3 transition duration-200 ease-in-out`}
            />
            {errors[field] && <span className="text-red-500 text-sm mt-1">{errors[field].message}</span>}
          </div>
        ))}

        {/* Dropdown for Country */}
        <div className="mb-6">
          <label className="block text-sm font-medium  mb-1">Country</label>
          <select
            {...register('country')}
            className={`mt-1 block w-full border ${
              errors.country ? 'border-red-500' : 'border'
            } rounded-md shadow-sm dark:bg-black  p-3 transition duration-200 ease-in-out`}
          >
            <option value="" disabled>Select your country</option>
            {countriesWithCodes.map(country => (
              <option key={country.name} value={country.name}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
          {errors.country && <span className="text-red-500 text-sm mt-1">{errors.country.message}</span>}
        </div>

        <button 
          type="submit" 
          className="w-full flex justify-center items-center gap-2 bg-purple-600 text-white font-semibold py-3 rounded-md hover:bg-purple-700 transition duration-200 ease-in-out"
        >
          Update Profile {isPending && <Loader className='animate-spin'/>}
        </button>
      </form>
    </section>
  );
};

export default AdminProfileUpdateForm;
