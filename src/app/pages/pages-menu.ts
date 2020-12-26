import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: false,
  },
  // {
  //   title: 'IoT Dashboard',
  //   icon: 'home-outline',
  //   link: '/pages/iot-dashboard',
  // },
  {
    title: 'Party',
    icon: 'person-outline',
    link: '/pages/party',
    hidden:false
    
  },
  {
    title: 'Quality',
    icon: 'award-outline',
    link: '/pages/quality',
    hidden:false
  },
  {
    title: 'User',
    icon: 'people-outline',
    link: '/pages/user',
    hidden:false
  },
  // {
  //   title: 'Fabric-In',
  //   icon: 'home-outline',
  //   link: '/pages/fabric-in',
  // },
  // {
  //   title: 'Batch',
  //   icon: 'home-outline',
  //   link: '/pages/batch',
  // },
  {
    title: 'Color',
    icon: 'color-palette-outline',
    link: '/pages/color',
    hidden:false
  },
  {
    title: 'Program',
    icon: 'hard-drive-outline',
    link: '/pages/program',
    hidden:false
  },
  {
    title: 'Water-jet',
    icon: 'droplet-outline',
    link: '/pages/waterJet',
    hidden:false
  },
  {
    title: 'Stock-batch',
    icon: 'layers-outline',
    link: '/pages/stock-batch',
    hidden:false
  },
  {
    title: 'Batch-shuffle',
    icon: 'flip-2-outline',
    link: '/pages/batch-shuffle',
    hidden:false
  },
  {
    title: 'Shade',
    icon: 'brush-outline',
    link: '/pages/shade',
    hidden:false
  },
  {
    title: 'Supplier',
    icon: 'car-outline',
    link: '/pages/supplier',
    hidden:false
  },
  {
    title: 'Process',
    icon: 'settings-2-outline',
    link: '/pages/process',
    hidden:false
  },
  {
    title: 'Finished Meter',
    icon: 'bar-chart-outline',
    link: '/pages/finishedMeter',
    hidden:false
  },
  {
    title: 'Production Planning',
    icon: 'options-2-outline',
    link: '/pages/production-planning',
    hidden:false
  },
  {
    title: 'Jet Planning',
    icon: 'options-outline',
    link: '/pages/jet-planning',
    hidden:false
  }
  ,{
    title: 'Generate Invoice',
    icon: 'file-text-outline',
    link: '/pages/generate_invoice',
    hidden:false
  },
  {
    title: 'Input Data',
    icon: 'home-outline',
    link: '/pages/input-data',
    hidden: false,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  // {
  //   title: 'Forms',
  //   icon: 'edit-2-outline',
  //   children: [
  //     {
  //       title: 'Form Inputs',
  //       link: '/pages/forms/inputs',
  //     },
  //     {
  //       title: 'Form Layouts',
  //       link: '/pages/forms/layouts',
  //     },
  //     {
  //       title: 'Buttons',
  //       link: '/pages/forms/buttons',
  //     },
  //     {
  //       title: 'Datepicker',
  //       link: '/pages/forms/datepicker',
  //     },
  //   ],
  // },
  // {
  //   title: 'Modal & Overlays',
  //   icon: 'browser-outline',
  //   children: [
  //     {
  //       title: 'Dialog',
  //       link: '/pages/modal-overlays/dialog',
  //     },
  //     {
  //       title: 'Window',
  //       link: '/pages/modal-overlays/window',
  //     },
  //     {
  //       title: 'Popover',
  //       link: '/pages/modal-overlays/popover',
  //     },
  //     {
  //       title: 'Toastr',
  //       link: '/pages/modal-overlays/toastr',
  //     },
  //     {
  //       title: 'Tooltip',
  //       link: '/pages/modal-overlays/tooltip',
  //     },
  //   ],
  // },
  // {
  //   title: 'Extra Components',
  //   icon: 'message-circle-outline',
  //   children: [
  //     {
  //       title: 'Spinner',
  //       link: '/pages/extra-components/spinner',
  //     },
  //     {
  //       title: 'Alert',
  //       link: '/pages/extra-components/alert',
  //     }
  //   ],
  // },
  
  {
    title: 'Miscellaneous',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  },
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
