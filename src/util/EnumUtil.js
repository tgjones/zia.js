var Zia;
(function (Zia) {
    Zia.EnumUtil = {
        hasFlag: function (value, flag) {
            return (value & flag) === flag;
        }
    };
})(Zia || (Zia = {}));
