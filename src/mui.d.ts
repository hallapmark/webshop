import '@mui/material/styles';
import '@mui/material/Button';

declare module '@mui/material/styles' {
  interface Palette {
    muted: Palette['primary'];
    accent?: Palette['primary'];
  }
  interface PaletteOptions {
    muted?: PaletteOptions['primary'];
    accent?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    muted: true;
    accent: true;
  }
}