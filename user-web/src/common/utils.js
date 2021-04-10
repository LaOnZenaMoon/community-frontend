const makeStringZeroFormat = (value) => {
  if (typeof value === 'string') {
    return value.length < 2 ? `0${value}` : value;
  }

  return '';
};

const parseDate = (dateToString) => {
  if (dateToString) {
    let date = new Date(dateToString);
    if (date.getTimezoneOffset() != -540) {
      const kst = date.getTime() - (9 * 60 * 60 * 1000);
      date = new Date(kst);
    }

    const fullYear = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const parsedDate = `${fullYear}-${makeStringZeroFormat(month.toString())}-${makeStringZeroFormat(day.toString())}T${makeStringZeroFormat(hour.toString())}:${makeStringZeroFormat(minute.toString())}:${makeStringZeroFormat(second.toString())}`;

    return parsedDate;
  }

  return '';
};

const makeDefaultGridHeaders = (items, actionNotUse) => {
  const headersArr = [];

  if (!actionNotUse) {
    headersArr.push({text: 'Actions', value: 'actions', align: 'center', sortable: false});
  }

  if (items.size == 0) {
    return headersArr;
  }

  Object.keys(items[0]).forEach(item => {
    headersArr.push({text: item, value: item, align: 'left'})
  });

  return headersArr;
};

const makeDefaultGridItems = (items) => {
  const itemsArr = [];
  const specialItemsArr = [];

  items.forEach((item) => {
    const keys = Object.keys(item);
    const modifiedItems = {};
    keys.forEach(key => {
      if (item[key] !== null && typeof item[key] === 'object') {
        modifiedItems[key] = JSON.stringify(item[key]);
        specialItemsArr.push({name: key, slotName: 'item.' + key});
      } else {
        modifiedItems[key] = item[key];
      }
    });
    itemsArr.push(modifiedItems);
  });

  const uniqueSpecialItemArr = [...new Set(specialItemsArr.map(JSON.stringify))].map(JSON.parse);

  return {
    items: itemsArr,
    specialItems: uniqueSpecialItemArr,
  };
};

const makeDefaultChartLabels = (items) => {
  const chartLabelsArr = [];

  if (items.size == 0) {
    return chartLabelsArr;
  }

  Object.keys(items[0]).forEach(item => {
    chartLabelsArr.push(item);
  });

  return chartLabelsArr;
};

export {
  parseDate,
  makeDefaultGridHeaders,
  makeDefaultGridItems,
  makeDefaultChartLabels,
}
