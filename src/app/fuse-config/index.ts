

/**
 * Default Fuse Configuration
 *
 * You can edit these options to change the default options. All these options also can be
 * changed per component basis. See `app/main/pages/authentication/login/login.component.ts`
 * constructor method to learn more about changing these options per component basis.
 */
interface FuseConfig {
  colorTheme: string;
  customScrollbars: boolean;
  layout: {
    style: string;
    width: string;
    navbar: {
      primaryBackground: string;
      secondaryBackground: string;
      folded: boolean;
      hidden: boolean;
      position: string;
      variant: string;
    };
    toolbar: {
      customBackgroundColor: boolean;
      background: string;
      hidden: boolean;
      position: string;
    };
    footer: {
      customBackgroundColor: boolean;
      background: string;
      hidden: boolean;
      position: string;
    };
    sidepanel: {
      hidden: boolean;
      position: string;
    };
  };
}

export const fuseConfig: FuseConfig = {
  // Color themes can be defined in src/app/app.theme.scss
  // colorTheme      : 'theme-blue-gray-dark',
  colorTheme: 'theme-default',
  customScrollbars: true,
  layout: {
    style: 'vertical-layout-1',
    width: 'fullwidth',
    navbar: {
      primaryBackground: 'fuse-navy-700',
      secondaryBackground: 'fuse-navy-900',
      folded: false,
      hidden: false,
      position: 'left',
      variant: 'vertical-style-2'
    },
    toolbar: {
      customBackgroundColor: true,
      background: 'fuse-navy-900',
      hidden: false,
      position: 'below-static'
    },
    footer: {
      customBackgroundColor: true,
      background: 'fuse-navy-900',
      hidden: true,
      position: 'below-fixed'
    },
    sidepanel: {
      hidden: false,
      position: 'right'
    }
  }
};
