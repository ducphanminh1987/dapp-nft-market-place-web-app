import axios from "axios";

const Pinata = (jwt) => {
  const uploadIPFSImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({ name: file.name });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadIPFSMetadata = async (metadata) => {
    var data = JSON.stringify({
      pinataOptions: {
        cidVersion: 1,
      },
      //   pinataMetadata: metadata,
      pinataContent: metadata,
    });

    var config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      data: data,
    };

    const res = await axios(config);

    return res.data;
  };

  return {
    uploadIPFSImage,
    uploadIPFSMetadata,
  };
};

export default Pinata;
