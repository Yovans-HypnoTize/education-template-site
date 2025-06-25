import homeReducer from "../pages/home/features/HomeSlice";
import { SubMenuItem } from "../types/types";

export const SlicePathConstants = {
  homeReducer,
};
export const MAX_FILE_SIZE = 5 * 1024 * 1024; 
export const sampleTableColumns = [
  {
    id: "menu",
    label: "MENU",
  },
  {
    id: "total_no_of_blocks",
    label: "TOTAL NO. OF BLOCKS",
  },
  {
    id: "no_of_blocks_used",
    label: "NO. OF BLOCKS USED",
  },
  {
    id: "no_of_promotional_banners",
    label: "NO. OF PROMOTIONAL BANNERS",
  },
];

export const ticketTableColumns = [
  {
    id: "ticketId",
    label: "TICKET ID",
  },
  {
    id: "userName",
    label: "USER NAME",
  },
  {
    id: "subject",
    label: "SUBJECT",
  },
  {
    id: "createdOn",
    label: "CREATED ON",
  },
  {
    id: "closedOn",
    label: "CLOSED ON",
  },
  // {
  //   id: "assignedTo",
  //   label: "ASSIGNED TO",
  // },
  {
    id: "status",
    label: "STATUS",
  },
  {
    id: "action",
    label: "ACTION",
    sort: false,
  }
];

export const userManagementTableColumns = [
  {
    id: "name",
    label: "NAME",
  },
  {
    id: "role",
    label: "ROLE",
  },
  {
    id: "email",
    label: "EMAIL",
  },
  {
    id: "phone",
    label: "PHONE",
  },
  {
    id: "lastActivity",
    label: "LAST ACTIVITY",
  },
];

export const registeredUsersTableColumns = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "phoneNo",
    label: "Phone Number",
  },
  {
    id: "joinedDate",
    label: "Registered Date",
  },
  // {
  //   id: "lastLogin",
  //   label: "LAST LOGIN",
  // },
];
export const enquiryColumns = [
  { id: "sNo", label: "S.No" },
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "phoneNo", label: "Phone Number" },
  { id: "organisationName", label: "Organisation Name" },
  { id: "category", label: "Category" },
  { id: "createdDate", label: "Created On" },
];


export const sampleTableRows = [
  {
    menu: "Home",
    total_no_of_blocks: 14,
    no_of_blocks_used: 13,
    no_of_promotional_banners: 2,
  },
  {
    menu: "About Us",
    total_no_of_blocks: 12,
    no_of_blocks_used: 10,
    no_of_promotional_banners: 1,
  },
  {
    menu: "Features",
    total_no_of_blocks: 8,
    no_of_blocks_used: 8,
    no_of_promotional_banners: 1,
  },
  {
    menu: "Plans & Pricing",
    total_no_of_blocks: 6,
    no_of_blocks_used: 3,
    no_of_promotional_banners: 0,
  },
  {
    menu: "Blog",
    total_no_of_blocks: 6,
    no_of_blocks_used: 2,
    no_of_promotional_banners: 1,
  },
  {
    menu: "Contact us",
    total_no_of_blocks: 3,
    no_of_blocks_used: 3,
    no_of_promotional_banners: 0,
  },
];

export const sampleTableRows2 = [
  {
    menu: "Home",
    total_no_of_blocks: 14,
    no_of_blocks_used: 13,
    no_of_promotional_banners: 2,
  },
  {
    menu: "Solutions Spotlight",
    total_no_of_blocks: 12,
    no_of_blocks_used: 10,
    no_of_promotional_banners: 1,
  },
  {
    menu: "Plans & Pricing",
    total_no_of_blocks: 8,
    no_of_blocks_used: 8,
    no_of_promotional_banners: 1,
  },
  {
    menu: "Why Edumaat",
    total_no_of_blocks: 6,
    no_of_blocks_used: 3,
    no_of_promotional_banners: 0,
  },
  {
    menu: "Resources",
    total_no_of_blocks: 6,
    no_of_blocks_used: 2,
    no_of_promotional_banners: 1,
  },
  {
    menu: "Contact us",
    total_no_of_blocks: 3,
    no_of_blocks_used: 3,
    no_of_promotional_banners: 0,
  },
];

export const sampleMenuData = [
  {
    id: "1",
    title: "Banner",
    fields: [
      {
        name: "title",
        label: "Title",
        type: "text",
        placeholder: "Where smart meets school",
        fieldType: "input",
      },
      {
        name: "shortDescription",
        label: "Short Description",
        type: "text",
        placeholder:
          "Edumaat simplifies the way institutions manage learning, operations and success.",
        fieldType: "textarea",
      },
      {
        name: "button",
        label: "Button",
        type: "button",
        placeholder: "Book Free Demo",
        fieldType: "button",
      },
      {
        name: "pickColorButton",
        label: "Pick Button Color",
        type: "button",
        placeholder: "Select Color",
        fieldType: "btnColorPicker",
      },
      {
        name: "contactUs",
        label: "noLabel",
        type: "dropdown",
        placeholder: "Contact Us",
        fieldType: "dropDown",
      },
    ],
  },
  {
    id: "2",
    title: "Features",
    fields: [
      {
        name: "templateName",
        label: "Template Name",
        type: "text",
        placeholder: "Enter template name",
        fieldType: "",
      },
    ],
  },
  {
    id: "3",
    title: "Plans & Pricing",
    children: [
      {
        id: "1.1",
        title: "Custom plan",
        fields: [
          {
            name: "price",
            label: "Price",
            type: "text",
            placeholder: "Enter price",
            fieldType: "",
          },
          {
            name: "duration",
            label: "Duration",
            type: "text",
            placeholder: "Enter duration",
            fieldType: "",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Clients",
    fields: [
      {
        name: "clients",
        label: "Promotional Banner",
        fieldType: "Toolbarbadge",
        removeBadgeIconAvailable: true,
      },
    ],
  },
  {
    id: "5",
    title: "Templates",
    fields: [
      {
        name: "templateName",
        label: "Template Name",
        type: "text",
        placeholder: "Enter template name",
        fieldType: "",
      },
    ],
  },
  {
    id: "6",
    title: "For Management",
    fields: [
      {
        name: "forManageMent",
        label: "For management",
        type: "text",
        placeholder: "Enter value",
        fieldType: "",
      },
    ],
  },
  {
    id: "7",
    title: "For Faculty",
    // fields: [
    //   {
    //     name: "forManageMent",
    //     label: "For management",
    //     type: "text",
    //     placeholder: "Enter value",
    //     fieldType: ""
    //   },
    // ],
  },
  {
    id: "8",
    title: "For Students",
    // fields: [
    //   {
    //     name: "forManageMent",
    //     label: "For management",
    //     type: "text",
    //     placeholder: "Enter value",
    //     fieldType: ""
    //   },
    // ],
  },
  {
    id: "9",
    title: "Testimonials",
    // fields: [
    //   {
    //     name: "forManageMent",
    //     label: "For management",
    //     type: "text",
    //     placeholder: "Enter value",
    //     fieldType: ""
    //   },
    // ],
  },
  {
    id: "10",
    title: "Stand out & Succeed",
    fields: [
      {
        name: "clients",
        label: "Promotional Banner",
        fieldType: "Toolbarbadge",
        removeBadgeIconAvailable: true,
      },
    ],
  },
  {
    id: "11",
    title: "Power your institution",
    // fields: [
    //   {
    //     name: "forManageMent",
    //     label: "For management",
    //     type: "text",
    //     placeholder: "Enter value",
    //     fieldType: ""
    //   },
    // ],
  },
  {
    id: "12",
    title: "Blog",
    // fields: [
    //   {
    //     name: "forManageMent",
    //     label: "For management",
    //     type: "text",
    //     placeholder: "Enter value",
    //     fieldType: ""
    //   },
    // ],
  },
  {
    id: "13",
    title: "Get Started",
    // fields: [
    //   {
    //     name: "forManageMent",
    //     label: "For management",
    //     type: "text",
    //     placeholder: "Enter value",
    //     fieldType: ""
    //   },
    // ],
  },
];

export const menuTemplateOptions = [
  {
    label: "Modal",
    value: "modal",
  },
  {
    label: "Accordion",
    value: "accordion",
  },
  {
    label: "Dashboard",
    value: "dashboard",
  },
];

export const menuPositionOptions = [
  {
    label: "TOP",
    value: "top",
  },
  {
    label: "RIGHT",
    value: "right",
  },
  {
    label: "BOTTOM",
    value: "bottom",
  },
  {
    label: "LEFT",
    value: "left",
  },
];

export const monthOptions = [
  {
    label: "Current month",
    value: "currentMonth",
  },
  {
    label: "Previous month",
    value: "previous month",
  },
  {
    label: "Last two months",
    value: "lastTwoMonths",
  },
];

export const initialValues = {
  addMenuInitialValues: {
    menu: "",
    menuTemplate: "",
    menuPosition: "",
  },
  addSubmenuInitialValues: {
    submenu: "",
    submenuTemplate: "",
    submenuPosition: "",
    saveSubmenu: false,
    currentSubmenuTitle: "",
  },
  addUserInitialValues: {
    name: "",
    email: "",
    phoneNo: {
      code: "+91",
      number: "",
    },
    role: "",
    userName: "",
    Password: "",
  },
};
