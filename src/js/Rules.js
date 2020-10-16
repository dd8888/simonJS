/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
import swal from "sweetalert";

export default class Rules {
  showRules() {
    if (localStorage.rules === undefined) {
      localStorage.rules = 1;
      swal(
        "Rules!",
        "Rules are simple. Players must repeat random sequences of sounds by pressing the colored keys in the correct order. ",
        "info"
      );
    }
  }
}
