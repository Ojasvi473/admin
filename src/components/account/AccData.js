import React, { useEffect, useState } from "react";
import styles from "./AccData.module.css";

const AccData = (props) => {
  const [accname, setAccname] = useState("");
  const [accpwd, setAccpwd] = useState("");
  const [acccpwd, setAcccpwd] = useState("");
  const [accemail, setAccemail] = useState("");
  const [accphone, setAccPhone] = useState("");
  const [accpic, setAccpic] = useState("");
  const [obj, setObj] = useState({});
  const [update, isUpdate] = useState(false);
  const [modal, setModal] = useState(false);

  let activeUser = props;

  let localData = JSON.parse(localStorage.getItem("accountsPage"));
  let selectedDatatoShow = localData[`${props.activeUser}`];

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const uploadedPic = event.target.result;
        setAccpic(uploadedPic);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfileHandler = () => {
    setObj({
      email:
        accemail === "" ? localData[`${props.activeUser}`].email : accemail,
      name: accname === "" ? localData[`${props.activeUser}`].name : accname,
      password:
        accpwd === "" ? localData[`${props.activeUser}`].password : accpwd,
      phone:
        accphone === "" ? localData[`${props.activeUser}`].phone : accphone,
      profilePic:
        accpic === "" ? localData[`${props.activeUser}`].profilePic : accpic,
    });
    isUpdate(true);
    setModal(true);
  };

  const deletephotoHandler = () => {
    setObj({
      email: localData[`${props.activeUser}`].email,
      name: localData[`${props.activeUser}`].name,
      password: localData[`${props.activeUser}`].password,
      phone: localData[`${props.activeUser}`].phone,
      profilePic: "",
    });
  };

  useEffect(() => {
    if (update) {
      let obj1 = JSON.parse(localStorage.getItem("accountsPage"));
      obj1 = {
        ...obj1,
        [`${JSON.stringify(activeUser).slice(
          15,
          JSON.stringify(activeUser).length - 2
        )}`]: obj,
      };
      localStorage.setItem("accountsPage", JSON.stringify(obj1));
    }
    setAccname("");
    setAccpwd("");
    setAccemail("");
    setAccPhone("");
    setAccpic("");
  }, [obj, update]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.accountdatacontainer}>
          <div className={styles.imgcontainer}>
            <img
              src={
                accpic.length > 0
                  ? accpic
                  : selectedDatatoShow !== undefined
                  ? selectedDatatoShow.profilePic
                  : ""
              }
              alt={
                selectedDatatoShow !== undefined ? selectedDatatoShow.name : ""
              }
            />
            <div className={styles.imgoverlay}>
              <i className="fa fa-trash-o" onClick={deletephotoHandler}></i>
            </div>
          </div>
          {/* Input for uploading a new photo */}
          <input
            // className="button"
            type="file"
            accept="image/*"
            id="photoInput"
            style={{ display: "none" }}
            onChange={handlePhotoUpload}
          />
          <label
            htmlFor="photoInput"
            style={{
              color: "#fff",
              backgroundColor: "#f5a623",
              border: "2px solid #f5a623",
              fontSize: "14px",
              fontWeight: "600",
              borderRadius: "0",
              padding: "13px 28px",
              transition: " all 0.2s ease",
              maxWidth: "100%",
              cursor: "pointer",
              textTransform: "uppercase",
              width: "100%",
            }}
          >
            Upload New Photo
          </label>
        </div>
        <div className={styles.accountdatacontainer}>
          <div className={styles.right}>
            <h2>Account Settings</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputcontainer}>
                <div className={styles.inputfields}>
                  <label>Account Name</label>
                  <input
                    type="text"
                    onChange={(e) => setAccname(e.target.value)}
                    value={
                      accname.length > 0
                        ? accname
                        : selectedDatatoShow !== undefined
                        ? selectedDatatoShow.name
                        : ""
                    }
                  />
                  <label>Password</label>
                  <input
                    type="password"
                    onChange={(e) => setAccpwd(e.target.value)}
                    value={
                      accpwd.length > 0
                        ? accpwd
                        : selectedDatatoShow !== undefined
                        ? selectedDatatoShow.password
                        : ""
                    }
                  />
                  <label>Phone</label>
                  <input
                    type="tel"
                    onChange={(e) => setAccPhone(e.target.value)}
                    value={
                      accphone.length > 0
                        ? accphone
                        : selectedDatatoShow !== undefined
                        ? selectedDatatoShow.phone
                        : ""
                    }
                  />
                </div>
                <div className={styles.inputfields}>
                  <label>Account Email</label>
                  <input
                    type="email"
                    onChange={(e) => setAccemail(e.target.value)}
                    value={
                      accemail.length > 0
                        ? accemail
                        : selectedDatatoShow !== undefined
                        ? selectedDatatoShow.email
                        : ""
                    }
                  />
                  <label>Re-enter Password</label>
                  <input
                    type="password"
                    onChange={(e) => setAcccpwd(e.target.value)}
                    value={
                      acccpwd.length > 0
                        ? accpwd
                        : selectedDatatoShow !== undefined
                        ? selectedDatatoShow.password
                        : ""
                    }
                  />
                  <div className={styles.btn}>
                    <button className="btn" onClick={updateProfileHandler}>
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {modal && (
        <div className={styles.modalouter}>
          <div className={styles.modal}>
            <i className="fa fa-close" onClick={() => setModal(false)}></i>
            <h1>Profile Updated</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default AccData;
