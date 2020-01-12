import React, { Component } from "react";
class Nav extends Component {
  state = {
    about: {
      name: "About",
      link: "/"
    },
    admission: {
      name: "Admission",
      link: "/"
    },
    academics: {
      name: "Academics",
      link: "/",
      children: {
        faculties: {
          name: "Faculties",
          link: "/",
          children: {
            socie: {
              name: "Socie",
              link: "/",
              children: {
                ice: {
                  name: "ICE",
                  link: "/",
                  children: null
                },
                cse: {
                  name: "CSE",
                  link: "/",
                  children: null
                }
              }
            },
            logistics: {
              name: "Logistics",
              link: "/",
              children: null
            }
          }
        }
      }
    }
  };

  render() {
    return null;
  }
}

export default Nav;
