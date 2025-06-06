interface ExerciseTemplateData {
  id: string;
  belongsTo: string;
  instruction: string;
  templateType: {
    method: string;
    generator: {
      name: string;
      // this is specific data for one type, does not have to look like this
      // execept for VARY_PROPERTY_WHOLE_NUMBER_RANGE generator
      // TODO: change this to <any> dict like last row, or make a real fancy "or" type 
      // (as soon as we have more than the two current types)
      data?: {
        propertyToVary: string;
        lowestVariationNumber: number;
        highestVariationNumber: number;
      };
    };
  };
  data?: { [key: string]: any };
}