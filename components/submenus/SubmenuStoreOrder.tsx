import SummarizeIcon from '@mui/icons-material/Summarize';

interface StateMenu {
    icon : any
    title : string
    link : string
}

const StoreOrder:StateMenu[] = [
    {
      icon: <SummarizeIcon />,
      title: "PB DC",
      link: "/pbdc"
    },
    {
      icon: <SummarizeIcon />,
      title: "PB Supplier",
      link: '/pbsupplier'
    },
    {
      icon: <SummarizeIcon />,
      title: "PO Canvas",
       link: "/home"
    }
  ];

export default StoreOrder;
