function sortObjectsByKeyOrder(objects, key, orderArray) {
  // Create a map of the orderArray for efficient lookup.
  const orderMap = new Map(orderArray.map((value, index) => [value, index]));

  // Sort the objects based on the orderArray.
  objects.sort((a, b) => {
    const aIndex = orderMap.get(a[key]);
    const bIndex = orderMap.get(b[key]);

    // Handle cases where the key is not found in the orderArray.
    if (aIndex === undefined) {
      return bIndex === undefined ? 0 : 1; // Put undefined at the end.
    }
    if (bIndex === undefined) {
      return -1; // Put undefined at the end.
    }

    return aIndex - bIndex;
  });

  return objects;
}

// Example usage:
const dessertsHeaders = [
    { title: 'Dessert (100g serving)', subtitle: "Dessert info", align: 'start', sortable: false, key: 'name', class: 'my-header-style' },
    { title: 'Calories\n(100g)', subtitle: "Total Calories", align: 'end', key: 'calories', class: 'my-header-style' },
    { title: 'Carbo ex. (eg)', subtitle: "Carbohydrate exchange rate", align: 'end', key: 'carboex', class: 'my-header-style' },
    { title: 'Fat (g)', subtitle: "Fat in dessert", align: 'end', key: 'fat', class: 'my-header-style' },
    { title: 'Carbs (g)', subtitle: "Carbs in dessert", align: 'end', key: 'carbs', class: 'my-header-style' },
    { title: 'Protein (g)', subtitle: "Protein in dessert", align: 'end', key: 'protein', class: 'my-header-style' },
    { title: 'Iron (%)', subtitle: "Iron in dessert", align: 'end', key: 'iron', class: 'my-header-style' },
    { title: 'Actions', subtitle: "Actions buttons", align: 'center', key: 'actions', sortable: false, width: '20%' },
    { title: 'Operations', subtitle: "Operation for item", align: 'center', key: 'operations', sortable: false, width: '5%' },
];

const orderArray =  [ "name", "calories", "carboex", "carbs", "fat", "iron", "protein", "actions", "operations" ]; // Desired order of 'id' values.

const sortedObjects = sortObjectsByKeyOrder(dessertsHeaders, 'key', orderArray);

console.log(sortedObjects);
