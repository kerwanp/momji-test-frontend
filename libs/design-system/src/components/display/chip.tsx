import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export type ChipProps = {
  children: ReactNode;
  onDelete?: () => void;
};

export function Chip({ children, onDelete }: ChipProps) {
  return (
    <motion.div
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="text-sm px-4 py-2 bg-white rounded-md flex items-center relative group"
    >
      {children}
      {onDelete && (
        <FontAwesomeIcon
          onClick={onDelete}
          icon={['fas', 'xmark']}
          className="bg-white rounded-full p-2 absolute right-2 opacity-0 group-hover:opacity-100 cursor-pointer transition-all"
        />
      )}
    </motion.div>
  );
}
