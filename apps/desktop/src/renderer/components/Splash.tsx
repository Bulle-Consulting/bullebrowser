import { product } from '@bullebrowser/brand-tokens';
import logo from '@bullebrowser/brand-tokens/logo.svg';

export function Splash() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-surface-dark text-ink-inverse">
      <img src={logo} alt="" width={96} height={96} />
      <div className="text-2xl font-semibold">{product.splashText}</div>
      <div className="text-sm text-ink-inverse/70">{product.tagline}</div>
    </div>
  );
}
