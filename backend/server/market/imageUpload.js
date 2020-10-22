import cloudinary from "cloudinary";

const cloudinaryCall = cloudinary.v2;

cloudinaryCall.config({
  cloud_name: "ibk-code",
  api_key: "594384648252153",
  api_secret: "AKUrKRHsE6XReuGIiGe0osgs6go",
});

export const imageUpload = (url, cb) => {
  cloudinaryCall.uploader.upload(
    url,
    {
      folder: "market-place",
      public_id: "market-place/market",
    },
    function (err, res) {
      if (err) {
        return err;
      } else {
        console.log(res.secure_url);
        return res.secure_url;
      }
    }
  );
};
