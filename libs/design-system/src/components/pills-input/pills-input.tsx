import { Combobox } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip, ProgressBar } from '../display';
import { useDebounce } from '../../hooks';
import { AnimatePresence, motion, Variants } from 'framer-motion';

const listAnimation: Variants = {
  show: { transition: { staggerChildren: 0.05 } },
};

const optionsAnimation: Variants = {
  open: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const optionAnimation: Variants = {
  open: { x: 0, display: 'flex' },
  closed: { x: 20, display: 'none' },
};

export type PillsInputArgs<T extends object> = {
  loading?: boolean;
  options: T[];
  debounceTime: number;
  getId: (value: T) => string | number;
  getLabel: (value: T) => string | number;

  onFilter: (selected: T[]) => void;
  onQuery: (query: string) => void;
};

export function PillsInput<T extends object>({
  loading,
  options,
  debounceTime,
  getLabel,
  getId,
  onFilter,
  onQuery,
}: PillsInputArgs<T>) {
  const [selected, setSelected] = useState<T[]>([]);
  const [query, setQuery] = useState<string>();

  const debouncedQuery = useDebounce(query, debounceTime ?? 0);

  useEffect(() => onQuery(debouncedQuery), [debouncedQuery, onQuery]);
  useEffect(() => onFilter(selected), [selected, onFilter]);

  const handleDelete = useCallback(
    (deletedItem: T) => {
      setSelected(selected.filter((item) => item !== deletedItem));
    },
    [setSelected, selected]
  );

  return (
    <Combobox
      value={selected}
      onChange={(values) => setSelected(values)}
      by={((a: T, b: T) => getId(a) === getId(b)) as any}
      multiple
    >
      <div className="flex flex-col gap-2 w-80">
        <div
          className={classNames(
            'flex flex-col gap-4 bg-slate-100 rounded-md px-6 py-4 text-purple-600 outline-none focus-within:shadow-lg transition-shadow relative'
          )}
        >
          {selected.length > 0 && (
            <motion.div variants={listAnimation} className="flex gap-1 flex-wrap">
              <AnimatePresence>
                {selected.map((item) => (
                  <Chip onDelete={() => handleDelete(item)} key={getId(item)}>
                    {getLabel(item)}
                  </Chip>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
          <Combobox.Input
            placeholder="Type and / or select"
            className="bg-transparent outline-none"
            onChange={(event) => setQuery(event.target.value)}
          />
          {loading && <ProgressBar className="absolute bottom-0 left-0 w-full" />}
        </div>

        <Combobox.Options as={Fragment} unmount={false} hold={true}>
          {({ open }) => (
            <AnimatePresence>
              {open && (
                <motion.ul
                  layout
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={optionsAnimation}
                  className="bg-slate-100 rounded-md shadow-md"
                >
                  {options.map((option) => (
                    <Combobox.Option key={getId(option)} value={option} as={Fragment}>
                      {({ selected, active }) => (
                        <motion.div
                          layout
                          variants={optionAnimation}
                          className={classNames(
                            'flex justify-between items-center px-6 py-4 rounded-md cursor-pointer transition-colors',
                            { 'bg-purple-500 text-white': active },
                            { 'bg-slate-100': !active }
                          )}
                        >
                          <div>{getLabel(option)}</div>
                          {selected && <FontAwesomeIcon icon={['fas', 'check']} />}
                        </motion.div>
                      )}
                    </Combobox.Option>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
