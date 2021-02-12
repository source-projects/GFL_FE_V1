import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: false,
  },
  {
    title: 'Admin',
    icon: 'edit-2-outline',
    link: '/pages/admin',
    hidden: false,
  },
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
  {
    title: 'Color',
    icon: 'color-palette-outline',
    link: '/pages/color',
    hidden:false,
    children: [
      {
        title: 'Color-Stock',
        icon: 'file-text-outline',
        link: '/pages/color',
      },
      {
        title: 'Issue-Color-Box',
        icon: 'file-text-outline',
        link: '/pages/color/issue-color-box',
      },
    ]
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
    hidden:false,
    children: [
      {
        title: 'Shade',
        icon: 'brush-outline',
        link: '/pages/shade',
      },
      {
        title: 'Pending APC',
        icon: 'file-text-outline',
        link: '/pages/shade/pending-apc',
      },
    ]
  },
  {
    title: 'Supplier',
    icon: 'car-outline',
    link: '/pages/supplier',
    hidden:false
  },
  // {
  //   title: 'Process',
  //   icon: 'settings-2-outline',
  //   link: '/pages/process',
  //   hidden:false
  // },
  {
    title: 'DyeingProcess',
    icon: 'settings-2-outline',
    link: '/pages/dyeing-process',
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
  // {
  //   title: 'Issue-Color-Box',
  //   icon: 'file-text-outline',
  //   link: '/pages/issue-color-box',
  //   hidden:false
  // },
  {
    title: 'Input Data',
    icon: 'edit-2-outline',
    link: '/pages/input-data',
    hidden: false,
  },
  {
    title: 'Payment',
    icon: 'credit-card-outline',
    children: [
      {
        title: 'Bill Payment',
        link: '/pages/payment/bill-payment',
      },
      {
        title: 'Advance Payment',
        link: '/pages/payment/advance-payment',
      },
    ],
  },
  {
    title: 'FEATURES',
    group: true,
  },
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
];
