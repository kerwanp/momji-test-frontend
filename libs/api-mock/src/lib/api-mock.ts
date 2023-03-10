export type People = {
  id: number;
  name: string;
};

export async function queryNames(query?: string, max = 5): Promise<People[]> {
  return new Promise((res) => {
    setTimeout(
      () =>
        res(
          [
            { id: 1, name: 'Durward Reynolds' },
            { id: 2, name: 'Kenton Towne' },
            { id: 3, name: 'Therese Wunsch' },
            { id: 4, name: 'Benedict Kessler' },
            { id: 5, name: 'Katelyn Rohan' },
            { id: 6, name: 'Horea Wilhelm' },
            { id: 7, name: 'Giorgi Nona' },
          ]
            .filter((p) => (query ? p.name.includes(query) : true))
            .slice(0, max)
        ),
      2000
    );
  });
}
