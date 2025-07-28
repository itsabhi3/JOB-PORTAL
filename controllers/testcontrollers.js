const testPostController = async (req, res) => {
  const { name } = req.body;
  console.log(name);
  
  res.status(200).send(`Your name is ${name}`);
};

export default testPostController;



// export const nameController = (req, res) => {
//   const { name } = req.body;

//   if (!name) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Name is required" });
//   }

//   // Dummy check
//   if (name === "r.qbo") {
//     return res.status(200).json({ success: true, message: "Valid name!" });
//   } else {
//     return res.status(404).json({ success: false, message: "Name not found" });
//   }
// };

// export default nameController;

  