import { PhotoUpload } from './PhotoUpload';
import { FormField } from './FormField';
import { FORM_FIELDS } from '../../../hooks/constants';
import { Button } from '../../common/Button';

const AccountSettings: React.FC = () => (
  <div className="flex flex-col items-center p-10">
    <PhotoUpload />
    <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-x-4 w-full">
      {FORM_FIELDS.map((field) => (
        <FormField
          key={field.id}
          {...field}
        />
      ))}
    </div>
    <div className="flex justify-end gap-4 mt-4 w-full">
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Update Profile</Button>
    </div>
  </div>
);

export default AccountSettings; 