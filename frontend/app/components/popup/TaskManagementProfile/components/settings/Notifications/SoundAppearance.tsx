'use client';

const SoundsAppearance: React.FC = () => {
  return (
    <div className='p-6 bg-white shadow-md rounded-md w-full max-w-lg mx-auto'>
      <h2 className='text-xl font-semibold mb-4'>Sound and appearance</h2>
      <p className='text-gray-600 mb-6'>Personalize how notifications sound and look</p>

      <div className='mb-4'>
        <label className='block text-lg font-medium mb-2'>Incoming messages</label>
        <select className='w-1/3 p-1 border border-black rounded-lg'>
          <option value='Every day'>Every day</option>
          <option value='Weekdays'>Weekdays</option>
        </select>
      </div>

      <div className='mb-4'>
        <label className='block text-lg font-medium mb-2'>Outgoing messages</label>
        <select className='w-1/3 p-1 border border-black rounded-lg'>
          <option value='Every day'>Every day</option>
          <option value='Weekdays'>Weekdays</option>
        </select>
      </div>

      <div className='flex items-center'>
        <input
          id='mute'
          type='checkbox'
          className='h-5 w-5 rounded'
        />
        <label htmlFor='mute' className='ml-3 text-gray-800'>
          Mute all messages sounds from FlowerWorker
        </label>
      </div>
    </div>
  );
};

export default SoundsAppearance;