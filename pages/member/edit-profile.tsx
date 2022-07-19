import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InputField from '../../components/atoms/InputField';
import Sidebar from '../../components/elements/Sidebar';
import { JWTPayloadTypes, UserTypes } from '../../services/data-types';
import { updateProfile } from '../../services/member';

export default function EditProfile() {
  const [user, setUser] = useState<any>({
    id: '',
    name: '',
    avatar: '',
    email: '',
  });
  const [imagePreview, setImagePreview] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFormPayload: UserTypes = payload.player;
      setUser(userFormPayload);
    }
  }, []);

  const onSubmit = async () => {
    const data = new FormData();
    data.append('image', user.avatar);
    data.append('name', user.name);

    const response = await updateProfile(user.id, data);

    if (response.error) {
      toast.error(response.message);
    } else {
      Cookies.remove('token');
      router.push('/sign-in');
      toast.success(
        'Profile updated successfully! Login again to see the changes.'
      );
    }
  };

  return (
    <>
      <Sidebar activeMenu="settings" />
      <section className="edit-profile overflow-auto">
        <main className="main-wrapper">
          <div className="ps-lg-0">
            <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
            <div className="bg-card pt-30 ps-30 pe-30 pb-30">
              <form action="">
                <div className="photo d-flex">
                  <div className="image-upload">
                    <label htmlFor="avatar">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="icon-upload"
                          width={90}
                          height={90}
                          style={{ borderRadius: '100%' }}
                        />
                      ) : (
                        <img
                          src={user.avatar}
                          alt="icon-upload"
                          width={90}
                          height={90}
                          style={{ borderRadius: '100%' }}
                        />
                      )}
                    </label>
                    <input
                      id="avatar"
                      type="file"
                      name="avatar"
                      accept="image/png, image/jpeg"
                      disabled
                      onChange={(e: any) => {
                        const img = e.target.files[0];
                        setImagePreview(URL.createObjectURL(img));
                        return setUser({ ...user, avatar: img });
                      }}
                    />
                  </div>
                </div>
                <div className="pt-30">
                  <InputField
                    label="Full Name"
                    placeholder="Enter your name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="pt-30">
                  <InputField
                    label="Email Address"
                    placeholder="Enter your email address"
                    value={user.email}
                    disabled
                  />
                </div>
                <div className="button-group d-flex flex-column pt-50">
                  <button
                    type="button"
                    className="btn btn-save fw-medium text-lg text-white rounded-pill"
                    onClick={onSubmit}
                  >
                    Save My Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
