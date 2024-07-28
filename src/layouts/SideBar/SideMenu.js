// export const MENUITEMS = [
//   {
//     menutitle: "MAIN",
//     Items: [
//       {
//         path: `/dashboard`,
//         icon: "home",
//         type: "link",
//         active: true,
//         title: "Dashboard",
//       },
//     ],
//   },
//   {
//     menutitle: "Pages",
//     Items: [
//       {
//         title: "Users",
//         icon: "user",
//         type: "sub",
//         active: false,
//         children: [
//           {
//             path: `/property-manager`,
//             type: "link",
//             title: "Property Managers",
//           },
//           {
//             path: `/guest`,
//             type: "link",
//             title: "Students",
//           },
//           {
//             path: `editor`,
//             type: "link",
//             title: "Editors",
//           },
//           {
//             path: `/agent`,
//             type: "link",
//             title: "Agent",
//           },
//           {
//             path: `cyber-partner`,
//             type: "link",
//             title: "Cyber Partners",
//           },
//           {
//             path: `caller`,
//             type: "link",
//             title: "Callers",
//           }
//         ],
//       },
//       // {
//       //   title: "College",
//       //   icon: "user",
//       //   type: "sub",
//       //   active: false,
//       //   children: [
//       //     {
//       //       path: `/college-list`,
//       //       type: "link",
//       //       title: "All College",
//       //     },
//       //     {
//       //       path: `/guest`,
//       //       type: "link",
//       //       title: "Add College",
//       //     }
//       //   ],
//       // },

//       {
//         title: "Property",
//         icon: "user",
//         type: "sub",
//         active: false,
//         children: [
//           {
//             path: `/university-property-list`,
//             type: "link",
//             title: "University Properties",
//           },
//           {
//             path: `/property-list`,
//             type: "link",
//             title: "College Properties",
//           },
//           {
//             path: `/property-list`,
//             type: "link",
//             title: "Online Learning",
//           },
//           {
//             path: `/property-list`,
//             type: "link",
//             title: "Eduversity",
//           },
//           {
//             path: `/add-property`,
//             type: "link",
//             title: "Add Property",
//           },

//         ],
//       }
//     ],
//   },
//   {
//     menutitle: "Other Features",
//     Items: [
//       {
//         title: "Status",
//         icon: "user",
//         type: "sub",
//         active: false,
//         children: [
//           {
//             path: `/status`,
//             type: "link",
//             title: "Status",
//           }
//         ],
//       },
//       {
//         title: "Property Type",
//         icon: "user",
//         type: "sub",
//         active: false,
//         children: [
//           {
//             path: `/property-type`,
//             type: "link",
//             title: "Property Type",
//           }
//         ],
//       },
//       {
//         title: "Categories",
//         icon: "user",
//         type: "sub",
//         active: false,
//         children: [
//           {
//             path: `/category-list`,
//             type: "link",
//             title: "Category",
//           }
//         ],
//       }

//     ],
//   },

// ];

export const MENUITEMS = [
  {
    menutitle: "Institute Features",
    Items: [
      {
        title: "Features",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {
            path: `/course-list`,
            type: "link",
            title: "Course",
          },
          {
            path: `/subject-list`,
            type: "link",
            title: "Subject",
          },
          {
            path: `/semester-list`,
            type: "link",
            title: "Phase",
          },

          {
            path: `/department-list`,
            type: "link",
            title: "Department",
          },
          // {
          //   path: `/exam`,
          //   type: "link",
          //   title: "Exam",
          // },
        ],
      },
    ],
  },
  {
    menutitle: "Other Features",
    Items: [
      {
        title: "Groups",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {
            path: `/group-list`,
            type: "link",
            title: "Groups",
          },
        ],
      },
    ],
  },

  {
    menutitle: "Attendance",
    Items: [
      {
        title: "Attendance",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {
            path: `/student-attendance-list`,
            type: "link",
            title: "Student Attendance",
          },
          {
            path: `/teacher-attendance-list`,
            type: "link",
            title: "Teacher Attendance",
          }
        ],
      },
    ],
  },
  {
    menutitle: "Users",
    Items: [
      {
        title: "Users",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {
            path: `/Student-list`,
            type: "link",
            title: "Students",
          },
          {
            path: `/Teacher-list`,
            type: "link",
            title: "Teachers",
          },
        ],
      },
    ],
  },
];

export const MENUITEMS2 = [
  {
    menutitle: "MAIN",
    Items: [
      {
        path: `/dashboard`,
        icon: "home",
        type: "link",
        active: true,
        title: "Dashboard",
      },
    ],
  },
  {
    menutitle: "Pages",
    Items: [
      {
        title: "College",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {
            path: `/college-list`,
            type: "link",
            title: "All College",
          },
          {
            path: `/guest`,
            type: "link",
            title: "Add College",
          },
        ],
      },
    ],
  },
  {
    menutitle: "Other Features",
    Items: [
      {
        title: "Status",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {
            path: `/status`,
            type: "link",
            title: "Status",
          },
        ],
      },
    ],
  },
];
export const PROPERTYMANAGERMENUITEMS = [
  {
    menutitle: "MAIN",
    Items: [
      {
        path: `/dashboard`,
        icon: "home",
        type: "link",
        active: true,
        title: "Dashboard",
      },
    ],
  },
  {
    menutitle: "Pages",
    Items: [
      {
        title: "Claim Property",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {
            path: `/claim-school-property-list`,
            type: "link",
            title: "School Properties",
          },
          {
            path: `/claim-coaching-property-list`,
            type: "link",
            title: "Coaching Properties",
          },
        ],
      },
      {
        title: "My Property",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {
            path: `/my-school-property-list`,
            type: "link",
            title: "My School Properties",
          },
          {
            path: `/my-coaching-property-list`,
            type: "link",
            title: "My Coaching Properties",
          },
        ],
      },
    ],
  },
];
export const EDITORMENUITEMS = [
  {
    menutitle: "MAIN",
    Items: [
      {
        path: `/dashboard`,
        icon: "home",
        type: "link",
        active: true,
        title: "Dashboard",
      },
    ],
  },
  {
    menutitle: "Pages",
    Items: [
      {
        title: "Property",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {
            path: `/university-property-list`,
            type: "link",
            title: "University Properties",
          },
          {
            path: `/property-list`,
            type: "link",
            title: "College properties",
          },
          {
            path: `/property-list`,
            type: "link",
            title: "Online Learning",
          },
          {
            path: `/property-list`,
            type: "link",
            title: "Eduversity",
          },
          {
            path: `/add-property`,
            type: "link",
            title: "Add Property",
          },
        ],
      },
    ],
  },
  {
    menutitle: "Other Features",
    Items: [
      {
        title: "Status",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {
            path: `/status`,
            type: "link",
            title: "Status",
          },
        ],
      },
      {
        title: "Property Type",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {
            path: `/property-type`,
            type: "link",
            title: "Property Type",
          },
        ],
      },
      {
        title: "Categories",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {
            path: `/category-list`,
            type: "link",
            title: "Category",
          },
        ],
      },
    ],
  },
];
export const SUPERADMINMENUITEMS = [
  {
    menutitle: "MAIN",
    Items: [
      {
        path: `/dashboard`,
        icon: "home",
        type: "link",
        active: true,
        title: "Dashboard",
      },
    ],
  },
  {
    menutitle: "Pages",
    Items: [
      {
        title: "Users",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {
            path: `/property-manager`,
            type: "link",
            title: "Property Managers",
          },
          {
            path: `/guest`,
            type: "link",
            title: "Students",
          },
          {
            path: `editor`,
            type: "link",
            title: "Editors",
          },
          {
            path: `/agent`,
            type: "link",
            title: "Agent",
          },
          {
            path: `cyber-partner`,
            type: "link",
            title: "Cyber Partners",
          },
          {
            path: `caller`,
            type: "link",
            title: "Callers",
          },
        ],
      },
      {
        title: "Property",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {
            path: `/university-property-list`,
            type: "link",
            title: "University Properties",
          },
          {
            path: `/property-list`,
            type: "link",
            title: "College properties",
          },
          {
            path: `/property-list`,
            type: "link",
            title: "Online Learning",
          },
          {
            path: `/property-list`,
            type: "link",
            title: "Eduversity",
          },
          {
            path: `/add-property`,
            type: "link",
            title: "Add Property",
          },
        ],
      },
    ],
  },
];
