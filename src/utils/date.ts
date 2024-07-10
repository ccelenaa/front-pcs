export function Since (date: any) {
    const now: any = new Date();
    const diffTime = now - date;
    const times = [
      {unity: 'w',value: Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7))},
      {unity: 'd',value: Math.floor(diffTime / (1000 * 60 * 60 * 24))},
      {unity: 'h',value: Math.floor(diffTime / (1000 * 60 * 60))},
      {unity: 'm',value: Math.floor(diffTime / (1000 * 60))},
      {unity: 's',value: Math.floor(diffTime / (1000))},
    ];
    const diff = times.find((e) => e.value > 0);

    return diff ? ` ${diff.value}${diff.unity}` : ' now'
}
