export default class Helper {

  transformName (name){
    // accept only a-z A-Z 0-9
    // 0-9 is not literally 0-9 is telling you it accept to any 0-9 stings
    name = name.replace(/[^a-zA-Z0-9]/g, ' ');

    // make the name to lower case also
    name = name.toLowerCase();

    return name;
  }

}