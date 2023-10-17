// import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
// import axios from 'axios'
// import Navbar from '../Components/Navbar'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import LinesEllipsis from "react-lines-ellipsis";
// import $ from "jquery";
// import moment from "moment";

// export default class Home extends React.Component {
//     constructor() {
//       super();
//       this.state = {
//         tipeKamarId: "",
//         nama_tipe_kamar: "",
//         harga: "",
//         deskripsi: "",
//         foto: "",
//         kamar: [],
//         booking: [],
//         id_booking: "",
//         userId: "",
//         id_customer: "",
//         nomor_pemesanan: "",
//         tgl_pemesanan: "",
//         tgl_check_in: "",
//         tgl_check_out: "",
//         nama_pemesan: "",
//         jumlah_kamar: "",
//         tipe_kamar: [],
//         user: [],
//         role: "",
//         token: "",
//         action: "",
//         isLogin: false,
//       };
  
//       this.state.id_customer = localStorage.getItem("id");
//       this.state.token = localStorage.getItem("token");
//     }

//     headerConfig = () => {
//         let header = {
//             headers: { Authorization: `Bearer ${this.state.token}` }
//         }
//         return header;
//     }

//     handleChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }

//     handleClose = () => {
//         $("#modal_detail").hide()
//     }

//     handleDetail = (item) => {
//         $("#modal_detail").show()
//         this.setState({
//             id_room_type: item.id_room_type,
//             nama_tipe_kamar: item.nama_tipe_kamar,
//             harga: item.harga,
//             deskripsi: item.deskripsi,
//             foto: item.foto
//         })
//     }

//     handleCloseBooking = () => {
//         $("#modal_booking").hide()
//     }

//     showModal = () => {
//         $("#modal_booking").show();
//         this.setState({
//           id_user: "",
//           id_customer: this.state.id,
//           id_room_type: "",
//           nomor_pemesanan: Math.floor(Math.random() * 90000) + 10000,
//           tgl_pemesanan: moment().format("YYYY-MM-DD"),
//           tgl_check_in: "",
//           tgl_check_out: "",
//           nama_pemesan: "",
//           jumlah_kamar: "",
//           action: "insert",
//         });
//       };
//       handleAddBooking = (event) => {
//         event.preventDefault()
//         let form = {
//           userId: this.state.userId,
//           id_customer: this.state.id,
//           tipeKamarId: this.state.tipeKamarId,
//           nomor_pemesanan: this.state.nomor_pemesanan,
//           tgl_pemesanan: this.state.tgl_pemesanan,
//           tgl_check_in: this.state.tgl_check_in,
//           tgl_check_out: this.state.tgl_check_out,
//           nama_user: this.state.nama_pemesan,
//           jumlah_kamar: this.state.jumlah_kamar,
//         };

//         //add pemesanan
//         let url = "http://localhost:3000/pesan/add";
//         axios
//           .post(url, form, this.headerConfig())
//           .then((response) => {
//             console.log(response)
//             this.getBooking();
//             // this.handleClose();
//             // window.location = "/mybookings";
//           })
//           .catch((error) => {
//             console.log("error add data", error);
//             if (error.response.status === 500 || error.response.status === 404) {
//               window.alert("Failed booking room");
//             }
//           });
//       };

//     handleSubmit = (e) => {
//       e.preventDefault();
//       const { tgl_check_in, tgl_check_out } = this.state; // Mengambil nilai dari state
  
//       let form = new FormData();
//       form.append("tgl_check_in", tgl_check_in);
//       form.append("tgl_check_out", tgl_check_out);
  
//       // Simpan tgl_check_in dan tgl_check_out ke dalam localStorage
//       localStorage.setItem("tgl_check_in", tgl_check_in);
//       localStorage.setItem("tgl_check_out", tgl_check_out);
//     }

//     _handleFilter = () => {
//         let data = {
//             tgl_check_in: this.state.tgl_check_in,
//             tgl_check_out: this.state.tgl_check_out
//         }
//         let url = "http://localhost:3000/kamar/available"
//         axios.post(url, data)
//             .then(response => {
//                 if (response.status === 200) {
//                     this.setState({
//                         rooms: response.data.room,
//                     })
//                     console.log(response.data.room)
//                 } else {
//                     alert(response.data.message)
//                     this.setState({ message: response.data.message })

//                 }
//             })
//             .catch(error => {
//                 console.log("error", error.response.status)
//             })
//     }

//     getBooking = () => {
//         let url = "http://localhost:3000/pesan/"
//         axios.get(url, this.headerConfig())
//             .then(response => {
//                 this.setState({
//                     room: response.data.data
//                 })
//                 console.log(response.data.data)
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }

//     getTypeRoom = () => {
//         let url = "http://localhost:3000/tipekamar/getAll"
//         axios.get(url)
//             .then(response => {
//                 this.setState({
//                     tipe_kamar: response.data.data
//                 })
//                 console.log(response.data.data)
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     }

//     getUser = () => {
//         let url = "http://localhost:3000/user/find"
//         axios.post(url, {
//           keyword: "resepsionis"
//         }, this.headerConfig())
//             .then(response => {
//                 this.setState({
//                     user: response.data.data
//                 })
//                 console.log(response.data.data)
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     }

//     showAlertMustLogin = () => {
//         window.alert("You must Register or Login as Customer");
//         window.location = "/logincust"
//     }

//     componentDidMount() {
//         this.getBooking()
//         this.getTypeRoom()
//         this.getUser()
//         if (this.state.token) {
//             this.setState({
//                 isLogin: true
//             })
//         }
//     }

//     render() {
//         return (
//           <div>
//             <div
//               name="home"
//               className="relative bg-gray-50 flex flex-col justify-between pb-44"
//             >
//               <Navbar />
//               <div className="grid md:grid-cols-2 max-w-[1240px] m-auto mt-20">
//                 <div>
//                   <img
//                     className="mt-16 ml-32 mb-10 w-3/4 rounded-lg shadow-lg "
//                     src="/assets/PhotoHome.png"
//                     alt="/"
//                   />
//                 </div>
//                 <div className="flex flex-col justify-center md:items-start w-full px-2 py-8">
//                   <p className="py-3 text-5xl md:text-5xl font-bold">
//                     Find <span className="text-blue-600">Comfortable</span> Room
//                   </p>
//                   <p className="text-5xl md:text-5xl font-bold mb-8">
//                     With OmahRehat.
//                   </p>
//                   <p className="text-md mr-12 mb-4">
//                     There are many variations of passages of Lorem Ipsum available,
//                     but the majority have suffered alteration in some form, by
//                     injected humour,or randomised but the majority have suffered
//                     alteration{" "}
//                   </p>
//                   {this.state.isLogin ? (
//                     <button
//                       className="py-2 px-1 sm:w-[25%] my-4 text-white border bg-[#394867] border-[#394867] rounded-md text-lg font-semibold hover:bg-[#9BA4B5] hover:text-white"
//                       onClick={() => this.showModal()}
//                     >
//                       Booking Now
//                     </button>
//                   ) : (
//                     <button
//                       className="py-2 px-1 sm:w-[25%] my-4 text-white border bg-[#394867] border-[#394867] rounded-md text-lg font-semibold hover:bg-[#9BA4B5] hover:text-white"
//                       onClick={() => this.showAlertMustLogin()}
//                     >
//                       Booking Now
//                     </button>
//                   )}
//                 </div>
//               </div>
    
//               <div class="flex flex-col mr-19 ml-40 mb-8">
//                 <div class="ml-48 w-3/5 bg-white-200 border-2 border-grey rounded-lg shadow h-auto">
//                   <form onSubmit={this.handleSubmit}>
//                     <div class="flex flex-row">
//                       <div className="pr-10 pl-10 pt-5 pb-6">
//                         <div class="flex items-center">
//                           <div className="mr-3 bg-[#9BA4B5] p-4 rounded-md h-auto">
//                             <FontAwesomeIcon
//                               icon={faCalendar}
//                               size="2x"
//                               color="#212A3"
//                             />
//                           </div>
//                           <div>
//                             <h3 className="mb-1 font-bold">Check-In Date</h3>
//                             <input
//                               type="date"
//                               name="tgl_check_in"
//                               id="tgl_check_in"
//                               className="border-2 border-[#9BA4B5] rounded-md p-1"
//                               value={this.state.tgl_check_in}
//                               onChange={this.handleChange}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="pr-10 pl-4 pt-5 pb-6">
//                         <div class="flex items-center">
//                           <div className="mr-3 bg-[#9BA4B5] p-4 rounded-md h-auto">
//                             <FontAwesomeIcon
//                               icon={faCalendar}
//                               size="2x"
//                               color="#212A3"
//                             />
//                           </div>
//                           <div>
//                             <h3 className="mb-1 font-bold">Check-Out Date</h3>
//                             <input
//                               type="date"
//                               name="tgl_check_out"
//                               id="tgl_check_out"
//                               className="border-2 border-[#9BA4B5] rounded-md p-1"
//                               value={this.state.tgl_check_out}
//                               onChange={this.handleChange}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="pr-2 pl-2 pt-9 pb-6">
//                         <button className="bg-[#394867] hover:bg-[#9BA4B5] text-white font-semibold p-2 pr-3 pl-3 w-full rounded focus:outline-none focus:shadow-outline" onClick={() => this.getTypeRoom()}>
//                           Check Rooms
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
    
//               {/* ini buat available room */}
//               {this.state.tipe_kamar?.length > 0 ? (
//                 <div className="m-6 pl-24">
//                   <p className="text-5xl font-bold mt-2">
//                     <span className="text-blue-600">Available</span> Room{" "}
//                   </p>
    
//                   <div class="grid grid-cols-3 mt-8">
//                     {this.state.tipe_kamar?.map((item, index) => (
//                       <div class="col-span-1">
//                         {/* Card untuk type room */}
//                         <div className="CardEvent" key={index}>
//                           <div className="max-w-sm h-3/4 mb-8 rounded-lg overflow-hidden shadow-xl border-1 border-black bg-white">
//                             <div className="container">
//                               <img
//                                 className="w-full h-48"
//                                 src={"http://localhost:3000/foto/" + item.foto}
//                               />
//                             </div>
//                             <div className="px-6 py-4 text-black">
//                               <div className="font-medium text-3xl mb-2">
//                                 {item.nama_tipe_kamar}
//                               </div>
//                               <p className="text-black text-light mb-4">
//                                 <LinesEllipsis
//                                   text={item.deskripsi}
//                                   maxLine="1"
//                                   ellipsis="..."
//                                 />
//                               </p>
//                               <div className="font-bold text-xl mb-2 text-[#212A3E]">
//                                 IDR {item.harga}/night
//                               </div>
//                             </div>
//                             <div className="px-6 pb-2">
//                               <button
//                                 className="mb-4 bg-[#9BA4B5] hover:bg-[#F1F6F9] text-black font-light  w-1/3 rounded-full focus:outline-none focus:shadow-outline"
//                                 type="button"
//                                 onClick={() => this.handleDetail(item)}
//                               >
//                                 {" "}
//                                 Detail
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 // this.state.
//                 <h2>Loading....</h2>
//               )}
//             </div>
    
//             {/* modal detail room */}
//             <div
//               id="modal_detail"
//               tabindex="-1"
//               class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full pt-10 pb-10 pl-96 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
//             >
//               <div class="relative w-full h-full max-w-lg md:h-auto border-2 border-gray-500 rounded-lg shadow shadow-2xl items-center">
//                 <div class="relative bg-white rounded-lg">
//                   <div class="flex items-center justify-between p-5 border-b rounded-t border-gray-500">
//                     <h3 class="p-2 text-xl font-medium text-gray-900 ">
//                       {this.state.nama_tipe_kamar}
//                     </h3>
//                     <button
//                       type="button"
//                       class="text-gray-400 bg-transparent hover:bg-red-500 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
//                       data-modal-hide="medium-modal"
//                       onClick={() => this.handleClose()}
//                     >
//                       <svg
//                         aria-hidden="true"
//                         class="w-5 h-5"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           fill-rule="evenodd"
//                           d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                           clip-rule="evenodd"
//                         ></path>
//                       </svg>
//                       <span class="sr-only">Close modal</span>
//                     </button>
//                   </div>
//                   <div class="p-6">
//                     <div className="container">
//                       <img
//                         class="rounded-md w-200 h-100"
//                         src={"http://localhost:3000/foto/" + this.state.foto}
//                       />
//                     </div>
//                     <div class="px-2 py-4">
//                       <div class="font-bold text-2xl mb-2">
//                         {this.state.nama_tipe_kamar}
//                       </div>
//                       <div class="font-bold text-xl mb-2 text-blue-600">
//                         {this.state.harga}/night
//                       </div>
//                       <p class="text-black-700 text-base">{this.state.deskripsi}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
    
//             {/* Modal Form */}
//             <div
//               id="modal_booking"
//               tabindex="-1"
//               class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full pt-4 pl-[600px] md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
//             >
//               <div class="relative w-full h-full max-w-lg md:h-auto border-2 border-gray-500 rounded-lg shadow shadow-2xl items-center">
//                 <div class="relative bg-white rounded-lg">
//                   <div class="flex items-center justify-between p-5 border-b rounded-t border-gray-500">
//                     <h3 class="p-2 text-xl font-medium text-gray-900 ">
//                       Add Booking Room
//                     </h3>
//                     <button
//                       type="button"
//                       class="text-gray-400 bg-transparent hover:bg-red-500 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
//                       data-modal-hide="medium-modal"
//                       onClick={() => this.handleCloseBooking()}
//                     >
//                       <svg
//                         aria-hidden="true"
//                         class="w-5 h-5"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           fill-rule="evenodd"
//                           d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                           clip-rule="evenodd"
//                         ></path>
//                       </svg>
//                       <span class="sr-only">Close modal</span>
//                     </button>
//                   </div>
//                   <div class="p-2">
//                     <div class="px-8 py-2 ">
//                       <form
//                         class="space-y-6"
//                         onSubmit={(event) => this.handleAddBooking(event)}
//                       >
//                         <div>
//                           <label
//                             for="nama_pemesan"
//                             class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
//                           >
//                             Guest Name
//                           </label>
//                           <input
//                             type="text"
//                             name="nama_pemesan"
//                             id="nama_pemesan"
//                             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
//                             placeholder="Name for guest"
//                             value={this.state.nama_pemesan}
//                             onChange={this.handleChange}
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label
//                             for="jumlah_kamar"
//                             class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
//                           >
//                             Total Room{" "}
//                           </label>
//                           <input
//                             type="number"
//                             name="jumlah_kamar"
//                             id="jumlah_kamar"
//                             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
//                             placeholder="Total room your booked"
//                             value={this.state.jumlah_kamar}
//                             onChange={this.handleChange}
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label
//                             for="id"
//                             class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
//                           >
//                             Room Type
//                           </label>
//                           <select
//                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
//                             placeholder="Jenis Room Type"
//                             name="tipeKamarId"
//                             value={this.state.tipeKamarId}
//                             onChange={this.handleChange}
//                             required
//                           >
//                             <option value="">Choose Room Type</option>
//                             {this.state.tipe_kamar.map((item, index) => (
//                               <option value={item.id}>
//                                 {item.nama_tipe_kamar}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                         <div>
//                           <label
//                             for="tgl_pemesanan"
//                             class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
//                           >
//                             Booking Date
//                           </label>
//                           <input
//                             type="text"
//                             name="tgl_pemesanan"
//                             id="tgl_pemesanan"
//                             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
//                             placeholder="Booking Date"
//                             value={moment().format("YYYY-MM-DD")}
//                             onChange={this.handleChange}
//                             required
//                             disabled
//                           />
//                         </div>
//                         <div>
//                           <label
//                             for="tgl_check_in"
//                             class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
//                           >
//                             Check-In Date
//                           </label>
//                           <input
//                             type="date"
//                             name="tgl_check_in"
//                             id="tgl_check_in"
//                             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
//                             placeholder="Choose check in date"
//                             value={this.state.tgl_check_in}
//                             onChange={this.handleChange}
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label
//                             for="tgl_check_out"
//                             class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
//                           >
//                             Check-Out Date
//                           </label>
//                           <input
//                             type="date"
//                             name="tgl_check_out"
//                             id="tgl_check_out"
//                             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
//                             placeholder="Choose check out date"
//                             value={this.state.tgl_check_out}
//                             onChange={this.handleChange}
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label
//                             for="id"
//                             class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
//                           >
//                             Resepsionis
//                           </label>
//                           <select
//                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
//                             placeholder="Jenis Room Type"
//                             name="userId"
//                             value={this.state.userId}
//                             onChange={this.handleChange}
//                             required
//                           >
//                             <option value="">Confirm your booking with</option>
//                             {this.state.user.map((item, index) => (
//                               <option value={item.id}>{item.nama_user}</option>
//                             ))}
//                           </select>
//                         </div>
//                         <button
//                           type="submit"
//                           class="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
//                         >
//                           Simpan
//                         </button>
//                       </form>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       }
    


// }

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import LinesEllipsis from "react-lines-ellipsis";
import $ from "jquery";
import moment from "moment";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      tipe: [],
      kamar: [],
      booking: [],
      tipe_kamar: [],
      avail: [],
      user: [],
      type: "",
      nama_tipe_kamar: "",
      harga: "",
      deskripsi: "",
      foto: "",
      nama_user: "",
      nomor_pemesanan: "",
      tgl_pemesanan: "",
      tgl_check_in: "",
      tgl_check_out: "",
      nama_pemesan: "",
      nama_tamu: "",
      email_pemesan: "",
      jumlah_kamar: "",
      role: "",
      token: "",
      action: "",
      isLogin: false,
    };

    this.state.id_customer = localStorage.getItem("id");
    this.state.token = localStorage.getItem("token");
    this.state.nama_user = localStorage.getItem("nama");
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  handleChange = (e) => {
    console.log("Selected value:", e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  

  handleClose = () => {
    $("#modal_detail").hide();
  };

  handleDetail = (item) => {
    $("#modal_detail").show();
    this.setState({
      id_room_type: item.id,
      nama_tipe_kamar: item.nama_tipe_kamar,
      harga: item.harga,
      deskripsi: item.deskripsi,
      foto: item.foto,
    });
  };

  handleCloseBooking = () => {
    $("#modal_booking").hide();
  };

  showModal = () => {
    $("#modal_booking").show();
    this.setState({
      nomor_pemesanan: "",
      nama_pemesan: "",
      email_pemesan: "",
      nama_user: "",
      tipe_kamar: "",
      tgl_check_in: "",
      tgl_check_out: "",
      nama_tamu: "",
      jumlah_kamar: 1,
      action: "insert",
      nomor_pemesanan: Math.floor(Math.random() * 90000) + 10000,
      // tgl_pemesanan: moment().format("YYYY-MM-DD"),
    });
  };
  handleAddBooking = (e) => {
    e.preventDefault();
    let form = {
      nama_pemesan: localStorage.getItem("nama"),
      email_pemesan: localStorage.getItem("email"),
      nama_user: localStorage.getItem("nama"),
      tipe_kamar: this.state.type,
      tgl_check_in: this.state.tgl_check_in,
      tgl_check_out: this.state.tgl_check_out,
      nama_tamu: this.state.nama_tamu,
      jumlah_kamar: this.state.jumlah_kamar,
      nomor_pemesanan: this.state.nomor_pemesanan,
      // tgl_pemesanan: this.state.tgl_pemesanan,
    };
    console.log(form)

    //add pesan
    let url = "http://localhost:3000/pesan/add";
    axios
      .post(url, form, this.headerConfig())
      .then((response) => {
        window.alert("Succes transaction");
        // this.getBooking();
        // this.handleClose();
        window.location = "/mybookings";
      })
      .catch((error) => {
        console.log("error add data", error);
        if (error.response && (error.response.status === 500 || error.response.status === 404 || error.response.status ===400)) {
          window.alert(error.response.data.message);
        }
      });
  };

  handleFilter = (e) => {
    e.preventDefault()
    let data = {
      tgl_check_in: this.state.tgl_check_in,
      tgl_check_out: this.state.tgl_check_out,
    };

    let url = "http://localhost:3000/kamar/getAvailable";
    axios
      .post(url, data, this.headerConfig())
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            avail: response.data.data,
          });
          console.log(response.data.data)
        } else {
          alert(response.data.message);
          this.setState({ message: response.data.message });
        }
      })
      .catch((error) => {
        console.log("error", error.response.status);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { tgl_check_in, tgl_check_out } = this.state; // Mengambil nilai dari state

    let form = new FormData();
    form.append("tgl_check_in", tgl_check_in);
    form.append("tgl_check_out", tgl_check_out);

    // Simpan tgl_check_in dan tgl_check_out ke dalam localStorage
    localStorage.setItem("tgl_check_in", tgl_check_in);
    localStorage.setItem("tgl_check_out", tgl_check_out);

    
  };

  //get all pemesanan
  getBooking = () => {
    let url = "http://localhost:3000/pesan/";
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({
          kamar: response.data.data,
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //get all tipe kamar
  getTypeRoom = () => {
    let url = "http://localhost:3000/tipekamar/getAll";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          tipe: response.data.data,
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUser = () => {
    let url = "http://localhost:3000/user/resepsionis";
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({
          user: response.data.data,
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showAlertMustLogin = () => {
    window.alert("You must Register or Login as Customer");
    window.location = "/logincust";
  };

  // handleCheckInChange = (e) => {
  //   this.setState({
  //     tgl_check_in: e.target.value,
  //   });
  //   if (this.state.tgl_check_out) {
  //     this.handleFilter();
  //   }
  // };

  // handleCheckOutChange = (e) => {
  //   this.setState({
  //     tgl_check_out: e.target.value,
  //   });
  //   if (this.state.tgl_check_in) {
  //     this.handleFilter();
  //   }
  // };

  componentDidMount() {
    this.getBooking();
    this.getTypeRoom();
    this.getUser();
    if (this.state.token) {
      this.setState({
        isLogin: true,
      });
    }
  }

  render() {
    return (
      <div>
        <div name="home" className="relative bg-orange-200 flex flex-col justify-between ">
          <Navbar />
          <section class="bg-orange-200  pb-28">
          <div className="grid md:grid-cols-2 max-w-[1240px] m-auto mt-20">
            <div>
              <img
                className="mt-16 ml-32 mb-10 w-3/4 rounded-lg shadow-lg "
                src="/assets/PhotoHome.png"
                alt="/"
              />
            </div>
            <div className="flex flex-col justify-center md:items-start w-full px-2 py-8">
              <p className="py-3 text-3xl font-bold">
              Selamat Datang di <span className="text-4xl text-orange-900">Sarenity Haven</span>
              </p>
              <p className="text-3xl font-bold mb-8">
              Temukan pengalaman menginap yang tak terlupakan              </p>
              <p className="text-md mr-12 mb-4">
              Dengan harga terbaik, penawaran eksklusif, dan jaminan harga terendah, kami berkomitmen untuk memberikan nilai terbaik untuk setiap perjalanan Anda. Tim dukungan pelanggan kami siap membantu Anda 24/7, memberikan rekomendasi khusus berdasarkan preferensi Anda. Bersama kami, setiap perjalanan adalah kisah sukses. {" "}
              </p>
              {this.state.isLogin ? (
                <button
                  className="py-2 px-1 sm:w-[25%] my-4 text-white border bg-orange-900 rounded-md text-lg font-semibold hover:bg-orange-500 hover:text-white"
                  onClick={() => this.showModal()}
                >
                  Booking Now
                </button>
              ) : (
                <button
                  className="py-2 px-1 sm:w-[25%] my-4 text-white border bg-orange-900  rounded-md text-lg font-semibold hover:bg-orange-500 hover:text-white"
                  onClick={() => this.showAlertMustLogin()}
                >
                  Booking Now
                </button>
              )}
            </div>
          </div>

          <div class="flex flex-col mr-19 ml-40 mb-8">
            <div class="ml-48 w-3/5 bg-white-200 border-2 border-grey rounded-lg shadow h-auto">
             
            <form onSubmit={(e) => this.handleFilter(e)}>
                  <div class="flex flex-row ml-11">
                    <div className="pr-10 pl-10 pt-5 pb-6">
                      <div class="flex items-center">
                        <div className="mr-3 bg-red-800 p-4 rounded-md h-auto">
                          <FontAwesomeIcon
                            icon={faCalendar}
                            size="2x"
                            color="white"
                          />
                        </div>
                        <div>
                          <h3 className="mb-1 font-bold">Check-In Date</h3>
                          <input
                            type="date"
                            name="tgl_check_in"
                            id="tgl_check_in"
                            className="border-2 border-[#9BA4B5] rounded-md p-1"
                            value={this.state.tgl_check_in}
                            onChange={this.handleChange}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="pr-10 pl-4 pt-5 pb-6 ml-16">
                      <div class="flex items-center">
                        <div className="mr-3 bg-red-800 p-4 rounded-md h-auto">
                          <FontAwesomeIcon
                            icon={faCalendar}
                            size="2x"
                            color="white"
                          />
                        </div>
                        <div>
                          <h3 className="mb-1 font-bold">Check-Out Date</h3>
                          <input
                            type="date"
                            name="tgl_check_out"
                            id="tgl_check_out"
                            className="border-2 border-[#9BA4B5] rounded-md p-1"
                            value={this.state.tgl_check_out}
                            onChange={this.handleChange}
                            min={this.state.tgl_check_in}
                          />
                        </div>
                        <button class="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500" type="submit">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </form>


            </div>
          </div>
          </section>

          {/* ini buat available room */}
          {this.state.avail?.length > 0 && (
                    <section >
            <div className="m-6 pl-24">
              <p className="text-5xl font-bold mt-2">
                <span className="text-blue-600">Available</span> Room{" "}
              </p>

              <div class="grid grid-cols-3 mt-8">
              {(this.state.tgl_check_in === "") && (this.state.tgl_check_out === "") ?
                  ""
                : this.state.avail?.map((item, index) => (
                  <div class="col-span-1">
                    {/* Card untuk type room */}
                    <div className="CardEvent" key={index}>
                      <div className="max-w-sm h-3/4 mb-8 rounded-lg overflow-hidden shadow-xl border-1 border-black bg-white">
                        <div className="container">
                          <img
                            className="w-full h-48"
                            src={"http://localhost:3000/foto/" + item.foto}
                          />
                        </div>
                        <div className="px-6 py-4 text-black">
                          <div className="font-medium text-3xl mb-2">
                            {item.nama_tipe_kamar}
                          </div>
                          <p className="text-black text-light mb-4">
                            <LinesEllipsis
                              text={item.deskripsi}
                              maxLine="1"
                              ellipsis="..."
                            />
                          </p>
                          <div className="font-bold text-xl mb-2 text-[#212A3E]">
                            IDR {item.harga}/night
                          </div>
                        </div>
                        <div className="flex px-6 pb-2">
                          <button
                            className="mb-4 bg-[#9BA4B5] hover:bg-[#F1F6F9] text-black font-light  w-1/3 rounded-full focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => this.handleDetail(item)}
                          >
                            {" "}
                            Detail
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )) }                
              </div>
              </div>
              </section>
                )}
            

        {/* modal detail room */}
        <div
          id="modal_detail"
          tabindex="-1"
          class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full pt-10 pb-10 pl-96 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
        >
          <div class="relative w-full h-full max-w-lg md:h-auto border-2 border-gray-500 rounded-lg shadow shadow-2xl items-center">
            <div class="relative bg-white rounded-lg">
              <div class="flex items-center justify-between p-5 border-b rounded-t border-gray-500">
                <h3 class="p-2 text-xl font-medium text-gray-900 ">
                  {this.state.nama_tipe_kamar}
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-red-500 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                  data-modal-hide="medium-modal"
                  onClick={() => this.handleClose()}
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-6">
                <div className="container">
                  <img
                    class="rounded-md w-200 h-100"
                    src={"http://localhost:3000/foto/" + this.state.foto}
                  />
                </div>
                <div class="px-2 py-4">
                  <div class="font-bold text-2xl mb-2">
                    {this.state.nama_tipe_kamar}
                  </div>
                  <div class="font-bold text-xl mb-2 text-blue-600">
                    {this.state.harga}/night
                  </div>
                  <p class="text-black-700 text-base">{this.state.deskripsi}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Form */}
        <div
          id="modal_booking"
          tabindex="-1"
          class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full pt-4 pl-[600px] md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
        >
          <div class="relative w-full h-full max-w-lg md:h-auto border-2 border-gray-500 rounded-lg shadow shadow-2xl items-center">
            <div class="relative bg-white rounded-lg">
              <div class="flex items-center justify-between p-5 border-b rounded-t border-gray-500">
                <h3 class="p-2 text-xl font-medium text-gray-900 ">
                  Add Booking Room
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-red-500 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                  data-modal-hide="medium-modal"
                  onClick={() => this.handleCloseBooking()}
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-2">
                <div class="px-8 py-2 ">
                  <form
                    class="space-y-6"
                    onSubmit={(event) => this.handleAddBooking(event)}
                  >
                    <div>
                      <label
                        for="nama_tamu"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Guest Name
                      </label>
                      <input
                        type="text"
                        name="nama_tamu"
                        id="nama_tamu"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                        placeholder="Name for guest"
                        value={this.state.nama_tamu}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="jumlah_kamar"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Total Room{" "}
                      </label>
                      <input
                        type="number"
                        name="jumlah_kamar"
                        id="jumlah_kamar"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                        placeholder="Total room your booked"
                        value={this.state.jumlah_kamar}
                        onChange={this.handleChange}
                        min="1"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="type"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Room Type
                      </label>

                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                        placeholder="Jenis Room Type"
                        name="type"
                        value={this.state.type}
                        onChange={this.handleChange}
                        required
                      >
                        <option value="">Choose Room Type</option>
                        {this.state.tipe &&
                          this.state.tipe.map((item, index) => (
                            <option key={index} value={item.nama_tipe_kamar}>
                              {item.nama_tipe_kamar}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label
                        for="tgl_check_in"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Check-In Date
                      </label>
                      <input
                        type="date"
                        name="tgl_check_in"
                        id="tgl_check_in"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                        placeholder="Choose check in date"
                        value={this.state.tgl_check_in}
                        onChange={this.handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label
                        for="tgl_check_out"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                      >
                        Check-Out Date
                      </label>
                      <input
                        type="date"
                        name="tgl_check_out"
                        id="tgl_check_out"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800"
                        placeholder="Choose check out date"
                        value={this.state.tgl_check_out}
                        onChange={this.handleChange}
                        required //wajib diiisi
                        min={this.state.tgl_check_in}
                      />
                    </div>

                    <button
                      type="submit"
                      class="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Simpan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
    }
  }