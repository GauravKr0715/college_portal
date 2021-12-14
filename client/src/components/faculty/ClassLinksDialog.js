// import React, { useState, useEffect } from "react";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Input from "@mui/material/Input";
// import FormHelperText from "@mui/material/FormHelperText";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
// import TextField from "@mui/material/TextField";
// import DialogTitle from "@mui/material/DialogTitle";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import Button from "@mui/material/Button";
// import MenuItem from "@mui/material/MenuItem";
// import DateTimePicker from "@mui/lab/DateTimePicker";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import LoadingOverlay from "react-loading-overlay";
// import Box from "@mui/material/Box";
// import "./new_assignment.css";

// function ClassLinksDialog(props) {

//   const [error, setError] = useState(null);

//   const [classes, setClasses] = useState([
//     {
//       class_id: "F901",
//       subject_name: "Subject 1",
//       section: "F9",
//     },
//     {
//       class_id: "F902",
//       subject_name: "Subject 2",
//       section: "F9",
//     },
//   ]);
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState('');

//   const [submitLoading, setSubmitLoading] = useState(false);

//   return (
//       <Dialog
//         maxWidth="md"
//         {...props}
//         aria-labelledby="responsive-dialog-title"
//         scroll="body"
//         onClose={() => { }}
//       >
//         {/* <DialogTitle
//           sx={{
//             backgroundColor: "#fff !important",
//             minWidth: "80vh",
//           }}
//           id="responsive-dialog-title"
//         >
//           {"Select a link for the class or add a new link"}
//         </DialogTitle> */}
//         <DialogContent
//           sx={{
//             backgroundColor: "#fff !important",
//             minHeight: "fit-content",
//           }}
//         >
//           <Box
//             component="form"
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               m: "auto",
//               width: "fit-content",
//               minWidth: "100%",
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             {error && (
//               <>
//                 <div
//                   className="err"
//                   style={{
//                     color: "red",
//                     fontWeight: "bold",
//                     fontSize: "15px",
//                     display: "block",
//                   }}
//                 >
//                   {error}
//                 </div>
//                 <br />
//               </>
//             )}
//             {
//               props.links && (
//                 div.link-container
//               )
//             }
//           </Box>
//         </DialogContent>
//         <DialogActions
//           sx={{
//             backgroundColor: "#fff !important",
//           }}
//         >
//           <Button autoFocus onClick={props.onClose}>
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//   );
// }

// export default ClassLinksDialog;
