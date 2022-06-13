import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import InputField from '../../components/atoms/InputField';
import Sidebar from '../../components/elements/Sidebar';
import { JWTPayloadTypes } from '../../services/data-types';

export default function EditProfile() {
  const [user, setUser] = useState({
    name: '',
    avatar: '',
    email: '',
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFormPayload = payload.player;
      setUser(userFormPayload);
    }
  }, []);

  const onSubmit = () => {
    console.log('SUBMIT', user);
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
                  {/* <div className="position-relative me-20">
                    <img
                      alt=""
                      src="/img/avatar-1.png"
                      width="90"
                      height="90"
                      className="avatar img-fluid"
                    />
                    <div className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center">
                      <Image
                        src="/icon/ic-trash.svg"
                        alt="icon-upload"
                        height={24}
                        width={24}
                      />
                    </div>
                  </div> */}
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
                {/* <div className="pt-30">
                  <InputField
                    label="Phone"
                    placeholder="Enter your phone number"
                  />
                </div> */}
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
