import classNames from 'classnames';
import style from './progress-bar.module.scss';

export type ProgressBarProps = {
  className?: string;
};

export function ProgressBar({ className }: ProgressBarProps) {
  return (
    <div className={classNames('h-1 w-full rounded-md overflow-hidden', className)}>
      <div
        className={classNames('bg-purple-500 rounded-md h-full absolute', style['inside-bar'])}
      ></div>
    </div>
  );
}
