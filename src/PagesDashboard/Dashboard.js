import React from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import axios from "axios";

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      customer: [],
      typeroom: [],
      room: [],
      role: "",
      token: "",
      action: "",
    };

    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "admin" ||
        localStorage.getItem("role") === "resepsionis"
      ) {
        this.state.token = localStorage.getItem("token");
        this.state.role = localStorage.getItem("role");
      } else {
        window.alert("You're not admin or resepsionis!");
        window.location = "/";
      }
    }
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  getUser = () => {
    //get
    let url = "http://localhost:3000/user/getAll";
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({
          user: response.data.count,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getCustomer = () => {
    let url = "http://localhost:8080/customer/";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          customer: response.data.count,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getRoom = () => {
    let url = "http://localhost:3000/room";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          room: response.data.count,
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getTypeRoom = () => {
    let url = "http://localhost:3000/room-type";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          typeroom: response.data.count,
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  checkRole = () => {
    if (this.state.role !== "admin" && this.state.role !== "resepsionis") {
      localStorage.clear();
      window.alert("You're not admin or resepsionis!");
      window.location = "/";
    }
  };

  componentDidMount() {
    this.getUser();
    this.getCustomer();
    this.getRoom();
    this.getTypeRoom();
    this.checkRole();
  }

  render() {
    return (
      <section className="dark:bg-gray-800 flex">
        <div className="fixed">
          <Sidebar />
          
        </div>
        <div className="container max-w-6xl p-2 space-y-2 sm:space-y-12 mx-24 ml-60">
          <Header />
          
          <a
            rel="noopener noreferrer"
            href="#"
            className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900"
          >
            
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60  "
              alt=""
              className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
            />
            <div className="p-6 space-y-2 lg:col-span-5">
              <h3 className="text-yellow-900 bg-orange-100 text-center text-2xl font-semibold sm:text-4xl">
                Sarenity Haven
              </h3>
              <p>
                Merupakan hotel bintang 5 yang menyediakan berbagai kamar dengan
                fasilitas yang memadai dengan harga terjangkau mirip hotel ala
                Eropa
              </p>
            </div>
          </a>
          <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <a
              rel="noopener noreferrer"
              href="#"
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900"
            >
              <img
                role="presentation"
                className="object-cover w-full rounded h-44 dark:bg-gray-500"
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjBiZWRyb29tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
              />
              <div className="p-6 space-y-2">
                <h3 className="text-yellow-900 bg-orange-100 text-2xl text-center font-semibold group-hover:underline group-focus:underline">
                  Standar Type
                </h3>
                <p>
                  Kesenangan yang Sederhana dalam Kamar Standar Kami: Kenyamanan
                  dan Keindahan yang Menenangkan di Setiap Sudut.
                </p>
              </div>
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline"
            >
              <img
                role="presentation"
                className="object-cover w-full rounded h-44 "
                src="https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGhvdGVsJTIwYmVkcm9vbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
              />
              <div className="p-6 space-y-2">
                <h3 className="text-yellow-900 bg-orange-100 text-2xl text-center font-semibold group-hover:underline group-focus:underline">
                  Deluxe Type
                </h3>
                <p>
                Pengalaman Luar Biasa dalam Kemewahan yang Tak Tergantikan: Nikmati Kesenangan Tak Terbatas di Kamar Deluxe Kami yang Mewah dan Memikat
                </p>
              </div>
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline"
            >
              <img
                role="presentation"
                className="object-cover w-full rounded h-44 dark:bg-gray-500"
                src="https://images.unsplash.com/photo-1631049552057-403cdb8f0658?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              />
              <div className="p-6 space-y-2">
                <h3 className="text-yellow-900 bg-orange-100 text-2xl text-center font-semibold group-hover:underline group-focus:underline">
                  Superior Type
                </h3>
                <p>
                Tempat yang Luas dan Mewah untuk Beristirahat: Rasakan Kemewahan Tertinggi dalam Kamar Superior Kami yang Elegan
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    );
  }
}
