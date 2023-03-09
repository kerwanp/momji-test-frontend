import { PillsInput } from '@momji/design-system';
import { useQuery } from '@tanstack/react-query';
import { People, queryNames } from '@momji/api-mock';
import { useState } from 'react';

export function NameSearch() {
  const [query, setQuery] = useState<string>();
  const [filters, setFilters] = useState<People[]>();

  const { data, isFetching } = useQuery(['names', query], () => queryNames(query), {
    placeholderData: [],
    keepPreviousData: true,
    enabled: query !== undefined,
  });

  return (
    <PillsInput
      loading={isFetching}
      options={data ?? []}
      getId={(v) => v.id}
      getLabel={(v) => v.name}
      onQuery={setQuery}
      debounceTime={200}
      onFilter={setFilters}
    />
  );
}
