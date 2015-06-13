module Zia {
  export var EnumUtil = {
    hasFlag: function (value: number, flag: number) {
      return (value & flag) === flag;
    }
  }
}
