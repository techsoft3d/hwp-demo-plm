<script>
import { getModelUrl } from "../javascript/paths";
import {
  getAssembly,
  loadStructure,
  loadCompleteNoteList,
} from "../javascript/data-utilities";

export default {
  data() {
    return {
      assembly: {},
      completeNodeList: [],
      structure: [],
    };
  },
  methods: {
    closeViewer() {
      console.log("close viewer");
      const partNumber = this.$route.params.partNumber;
      const projectNumber = this.$route.params.projectNumber;
      this.$router.push(`/project/${projectNumber}/part/${partNumber}`);
    },
    getModelUrl: getModelUrl,
  },
  async mounted() {
    const projectNumber = this.$route.params.projectNumber;
    this.assembly = getAssembly(projectNumber);
    this.structure = await loadStructure(projectNumber);
    this.completeNodeList = loadCompleteNoteList(projectNumber, this.structure);

    let viewer = new Communicator.WebViewer({
      containerId: "viewerContainer",
      endpointUri: this.getModelUrl(this.assembly.CADFile),
    });

    // Find node with name
    var findNode = function (nodeId, name) {
      var children = viewer.model.getNodeChildren(nodeId);
      for (var i = 0; i < children.length; i++) {
        if (viewer.model.getNodeName(children[i]) === name) {
          return children[i];
        } else {
          let ret = findNode(children[i], name);
          if (ret != -1) return ret;
        }
      }
      return -1;
    };

    // Find the part's name
    const findPartNode = (pNumber) => {
      for (let i = 0; i < this.completeNodeList.length; i++) {
        if (this.completeNodeList[i].partnumber == pNumber) {
          return this.completeNodeList[i];
        }
      }
      return null;
    };

    const partNumber = this.$route.params.partNumber;
    viewer.setCallbacks({
      modelStructureReady: function () {
        viewer.model.setNodesVisibility([0], false);
        let partNode = findPartNode(partNumber);
        let childNodeId = findNode(0, partNode.modelBrowserName);
        viewer.model.setNodesVisibility([childNodeId], true);
        viewer.view.fitNodes([childNodeId]);
      },
    });

    window.addEventListener("resize", function () {
      viewer.resizeCanvas();
    });

    const uiConfig = {
      containerId: "content",
      screenConfiguration: Sample.screenConfiguration,
    };
    new Communicator.Ui.Desktop.DesktopUi(viewer, uiConfig);

    viewer.start();
  },
};
</script>

<template>
  <div id="content" class="viewer" style="line-height: 1; box-sizing: initial">
    <!-- Viewer Container -->
    <div id="viewerContainer"></div>
    <!-- Toolbar HTML-->
    <div class="fullscreen">
      <div class="navbar">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link button"> V. {{ "revision" }} </a>
            <div class="navbar-dropdown is-boxed">
              <a class="navbar-item" @click="changeRevision(1)"> V. 1 </a>
              <a class="navbar-item" @click="changeRevision(2)"> V. 2 </a>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link button">
              <span class="icon">
                <i class="fa fa-navicon"></i>
              </span>
            </a>
            <div class="navbar-dropdown is-boxed">
              <a
                class="navbar-item"
                @click="
                  eco.node = currentNode;
                  ecoVisible = true;
                "
              >
                ECO...
              </a>
              <!-- <a
                class="navbar-item"
                v-show="checkedOut"
                @click="checkedOut = false"
                >Check in</a
              >
              <a
                class="navbar-item"
                v-show="!checkedOut"
                @click="checkedOut = true"
                >Check out</a
              > -->
              <a class="navbar-item" @click="uploadVisible = true">
                Upload...
              </a>
            </div>
          </div>
          <a class="navbar-item" @click="closeViewer()">
            <span class="icon">
              <i class="fa fa-close"></i>
            </span>
          </a>
        </div>
      </div>
    </div>

    <div id="toolBar">
      <div class="toolbar-tools">
        <div
          id="home-button"
          title="Reset Camera"
          data-operatorclass="toolbar-home"
          class="hoops-tool"
        >
          <div class="tool-icon"></div>
        </div>
        <div id="tool_separator_1" class="tool-separator"></div>
        <div
          id="view-button"
          title="Camera Menu"
          data-operatorclass="toolbar-camera"
          data-submenu="view-submenu"
          class="hoops-tool toolbar-menu"
        >
          <div class="tool-icon"></div>
        </div>
        <div
          id="edgeface-button"
          title="Wireframe on Shaded"
          data-operatorclass="toolbar-wireframeshaded"
          data-submenu="edgeface-submenu"
          class="hoops-tool toolbar-menu"
        >
          <div class="tool-icon"></div>
        </div>
        <div id="tool_separator_2" class="tool-separator"></div>
        <div
          id="redline-button"
          title="Redline Note"
          data-operatorclass="toolbar-redline-note"
          data-submenu="redline-submenu"
          class="hoops-tool toolbar-radio"
        >
          <div class="smarrow"></div>
          <div class="tool-icon"></div>
        </div>
        <div
          id="click-button"
          title="Select"
          data-operatorclass="toolbar-select"
          data-submenu="click-submenu"
          class="hoops-tool toolbar-radio active-tool"
        >
          <div class="smarrow"></div>
          <div class="tool-icon"></div>
        </div>
        <div
          id="camera-button"
          title="Orbit Camera"
          data-operatorclass="toolbar-orbit"
          data-submenu="camera-submenu"
          class="hoops-tool toolbar-menu"
        >
          <div class="tool-icon"></div>
        </div>
        <div id="tool_separator_3" class="tool-separator"></div>
        <div
          id="explode-button"
          title="Explode Menu"
          data-operatorclass="toolbar-explode"
          data-submenu="explode-slider"
          class="hoops-tool toolbar-menu-toggle"
        >
          <div class="tool-icon"></div>
        </div>
        <div
          id="cuttingplane-button"
          title="Cutting Plane Menu"
          data-operatorclass="toolbar-cuttingplane"
          data-submenu="cuttingplane-submenu"
          class="hoops-tool toolbar-menu-toggle"
        >
          <div class="tool-icon"></div>
        </div>
        <div id="tool_separator_4" class="tool-separator"></div>
        <div
          id="snapshot-button"
          title="Snapshot"
          data-operatorclass="toolbar-snapshot"
          class="hoops-tool"
        >
          <div class="tool-icon"></div>
        </div>
        <div
          id="settings-button"
          title="Settings"
          data-operatorclass="toolbar-settings"
          class="hoops-tool"
        >
          <div class="tool-icon"></div>
        </div>
      </div>
      <div id="submenus">
        <div
          id="redline-submenu"
          data-button="redline-button"
          class="toolbar-submenu submenus"
        >
          <table>
            <tr>
              <td>
                <div
                  id="redline-circle-button"
                  title="Redline Cirlce"
                  data-operatorclass="toolbar-redline-circle"
                  class="submenu-icon"
                ></div>
              </td>
              <td>
                <div
                  id="redline-rectangle-button"
                  title="Redline Rectangle"
                  data-operatorclass="toolbar-redline-rectangle"
                  class="submenu-icon"
                ></div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  id="redline-note"
                  title="Redline Note"
                  data-operatorclass="toolbar-redline-note"
                  class="submenu-icon"
                ></div>
              </td>
              <td>
                <div
                  id="redline-freehand"
                  title="Redline Freehand"
                  data-operatorclass="toolbar-redline-freehand"
                  class="submenu-icon"
                ></div>
              </td>
            </tr>
          </table>
        </div>
        <div
          id="camera-submenu"
          data-button="camera-button"
          class="toolbar-submenu submenus"
        >
          <table>
            <tr>
              <td>
                <div
                  id="operator-camera-walk"
                  title="Walk"
                  data-operatorclass="toolbar-walk"
                  class="submenu-icon"
                ></div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  id="operator-camera-turntable"
                  title="Turntable"
                  data-operatorclass="toolbar-turntable"
                  class="submenu-icon"
                ></div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  id="operator-camera-orbit"
                  title="Orbit Camera"
                  data-operatorclass="toolbar-orbit"
                  class="submenu-icon"
                ></div>
              </td>
            </tr>
          </table>
        </div>
        <div
          id="edgeface-submenu"
          data-button="edgeface-button"
          class="toolbar-submenu submenus"
        >
          <table>
            <tr>
              <td>
                <div
                  id="viewport-wireframe-on-shaded"
                  title="Shaded With Lines"
                  data-operatorclass="toolbar-wireframeshaded"
                  class="submenu-icon"
                ></div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  id="viewport-shaded"
                  title="Shaded"
                  data-operatorclass="toolbar-shaded"
                  class="submenu-icon"
                ></div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  id="viewport-hiddenline"
                  title="Hidden Line"
                  data-operatorclass="toolbar-hidden-line"
                  class="submenu-icon"
                ></div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  id="viewport-wireframe"
                  title="Wireframe"
                  data-operatorclass="toolbar-wireframe"
                  class="submenu-icon"
                ></div>
              </td>
            </tr>
          </table>
        </div>
        <div id="view-submenu" class="toolbar-submenu submenus">
          <table>
            <tr>
              <td>
                <div
                  id="view-face"
                  title="Orient Camera To Selected Face"
                  data-operatorclass="toolbar-face"
                  class="submenu-icon disabled"
                ></div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  id="view-iso"
                  title="Iso View"
                  data-operatorclass="toolbar-iso"
                  class="submenu-icon"
                ></div>
              </td>
              <td>
                <div
                  id="view-ortho"
                  title="Orthographic Projection"
                  data-operatorclass="toolbar-ortho"
                  class="submenu-icon"
                ></div>
              </td>
              <td>
                <div
                  id="view-persp"
                  title="Perspective Projection"
                  data-operatorclass="toolbar-persp"
                  class="submenu-icon"
                ></div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  id="view-left"
                  title="Left View"
                  data-operatorclass="toolbar-left"
                  class="submenu-icon"
                ></div>
              </td>
              <td>
                <div
                  id="view-right"
                  title="Right View"
                  data-operatorclass="toolbar-right"
                  class="submenu-icon"
                ></div>
              </td>
              <td>
                <div
                  id="view-bottom"
                  title="Bottom View"
                  data-operatorclass="toolbar-bottom"
                  class="submenu-icon"
                ></div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  id="view-front"
                  title="Front View"
                  data-operatorclass="toolbar-front"
                  class="submenu-icon"
                ></div>
              </td>
              <td>
                <div
                  id="view-back"
                  title="Back View"
                  data-operatorclass="toolbar-back"
                  class="submenu-icon"
                ></div>
              </td>
              <td>
                <div
                  id="view-top"
                  title="Top View"
                  data-operatorclass="toolbar-top"
                  class="submenu-icon"
                ></div>
              </td>
            </tr>
          </table>
        </div>
        <div
          id="click-submenu"
          data-button="click-button"
          class="toolbar-submenu submenus"
        >
          <table>
            <tr>
              <td>
                <div
                  id="note-button"
                  title="Create Note-Pin"
                  data-operatorclass="toolbar-note"
                  class="submenu-icon"
                ></div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  id="measure-angle-between-faces"
                  title="Measure Angle Between Faces"
                  data-operatorclass="toolbar-measure-angle"
                  class="submenu-icon"
                ></div>
              </td>
              <td>
                <div
                  id="measure-distance-between-faces"
                  title="Measure Distance Between Faces"
                  data-operatorclass="toolbar-measure-distance"
                  class="submenu-icon"
                ></div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  id="measure-edges"
                  title="Measure Edges"
                  data-operatorclass="toolbar-measure-edge"
                  class="submenu-icon"
                ></div>
              </td>
              <td>
                <div
                  id="measure-point-to-point"
                  title="Measure Point to Point"
                  data-operatorclass="toolbar-measure-point"
                  class="submenu-icon"
                ></div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  id="select-parts"
                  title="Select Parts"
                  data-operatorclass="toolbar-select"
                  class="submenu-icon"
                ></div>
              </td>
              <td>
                <div
                  id="area-select"
                  title="Area Select"
                  data-operatorclass="toolbar-area-select"
                  class="submenu-icon"
                ></div>
              </td>
            </tr>
          </table>
        </div>
        <div id="explode-slider" class="toolbar-submenu slider-menu submenus">
          <div
            id="explosion-slider"
            style="height: 90px"
            class="toolbar-slider"
          ></div>
        </div>
        <div
          id="cuttingplane-submenu"
          class="toolbar-submenu cutting-plane submenus no-modal"
        >
          <table>
            <tr>
              <td>
                <div
                  id="cuttingplane-face"
                  title="Create Cutting Plane On Selected Face"
                  data-plane="face"
                  data-operatorclass="toolbar-cuttingplane-face"
                  class="toolbar-cp-plane submenu-icon disabled"
                ></div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  id="cuttingplane-x"
                  title="Cutting Plane X"
                  data-plane="x"
                  data-operatorclass="toolbar-cuttingplane-x"
                  class="toolbar-cp-plane submenu-icon"
                ></div>
              </td>
              <td>
                <div
                  id="cuttingplane-section"
                  title="Cutting Plane Visibility Toggle"
                  data-plane="section"
                  data-operatorclass="toolbar-cuttingplane-section"
                  class="toolbar-cp-plane submenu-icon disabled"
                ></div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  id="cuttingplane-y"
                  title="Cutting Plane Y"
                  data-plane="y"
                  data-operatorclass="toolbar-cuttingplane-y"
                  class="toolbar-cp-plane submenu-icon"
                ></div>
              </td>
              <td>
                <div
                  id="cuttingplane-toggle"
                  title="Cutting Plane Section Toggle"
                  data-plane="toggle"
                  data-operatorclass="toolbar-cuttingplane-toggle"
                  class="toolbar-cp-plane submenu-icon disabled"
                ></div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  id="cuttingplane-z"
                  title="Cutting Plane Z"
                  data-plane="z"
                  data-operatorclass="toolbar-cuttingplane-z"
                  class="toolbar-cp-plane submenu-icon"
                ></div>
              </td>
              <td>
                <div
                  id="cuttingplane-reset"
                  title="Cutting Plane Reset"
                  data-plane="reset"
                  data-operatorclass="toolbar-cuttingplane-reset"
                  class="toolbar-cp-plane submenu-icon disabled"
                ></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!-- Viewer Settings Window -->
    <div id="viewer-settings-dialog" class="hoops-ui-window">
      <div class="hoops-ui-window-header">Viewer Settings</div>
      <div class="hoops-ui-window-body">
        <!--general-->
        <div class="settings-group-header">General</div>
        <div class="settings-group settings-group-general">
          <div class="settings-block">
            <label>Projection Mode:</label>
            <select id="settings-projection-mode" class="right-align">
              <option value="0">Orthographic</option>
              <option value="1">Perspective</option>
            </select>
            <span class="clear-both"></span>
          </div>
          <div class="settings-block">
            <span class="framerate-text">Framerate (fps):</span>
            <input
              type="number"
              min="0"
              id="settings-framerate"
              class="right-align"
            />
            <span class="clear-both"></span>
          </div>
          <div class="settings-block">
            <span>Hidden Line Opacity (0-1): </span>
            <input
              id="settings-hidden-line-opacity"
              class="right-align"
              type="number"
              min="0"
              max="1"
              step=".1"
            />
            <span class="clear-both"></span>
          </div>
          <div class="settings-block">
            <label for="settings-show-backfaces">Show Backfaces:</label>
            <input
              type="checkbox"
              id="settings-show-backfaces"
              class="right-align"
            />
            <span class="clear-both"></span>
          </div>
          <div class="settings-block">
            <label for="settings-show-capping-geometry"
              >Show Capping Geometry:</label
            >
            <input
              type="checkbox"
              id="settings-show-capping-geometry"
              class="right-align"
            />
            <span class="clear-both"></span>
          </div>
          <div class="settings-block">
            <span>Enable Face / Line Selection: </span>
            <input
              type="checkbox"
              id="settings-enable-face-line-selection"
              class="right-align"
            />
            <span class="clear-both"></span>
          </div>
          <div class="settings-block">
            <span>Rotate around camera center:</span>
            <input
              type="checkbox"
              id="settings-orbit-mode"
              class="right-align"
            />
            <span class="clear-both"></span>
          </div>
        </div>

        <!-- effects -->
        <div class="settings-group-header">Effects</div>
        <div class="settings-group settings-group-general">
          <div class="settings-block">
            <span>Enable Ambient Occlusion:</span>
            <input type="checkbox" id="settings-ambient-occlusion" />
            <input
              id="settings-ambient-occlusion-radius"
              type="number"
              min="0"
              max="10"
              step=".01"
              class="right-align"
            />
            <div class="right-align">Radius:</div>
            <span class="clear-both"></span>
          </div>
          <div class="settings-block">
            <span>Enable Anti-Aliasing:</span>
            <input
              type="checkbox"
              id="settings-anti-aliasing"
              class="right-align"
            />
            <span class="clear-both"></span>
          </div>
        </div>

        <!-- axis -->
        <div class="settings-group-header">Axis</div>
        <div class="settings-group settings-group-general">
          <div class="settings-block">
            <span>Show Axis Triad:</span>
            <input
              type="checkbox"
              id="settings-axis-triad"
              class="right-align"
            />
            <span class="clear-both"></span>
          </div>
          <div class="settings-block">
            <span>Show Nav Cube:</span>
            <input type="checkbox" id="settings-nav-cube" class="right-align" />
            <span class="clear-both"></span>
          </div>
        </div>

        <!-- point cloud -->
        <div class="settings-group-header">Point Cloud</div>
        <div class="settings-group settings-group-general">
          <div class="settings-block">
            <span>Enable Splats:</span>
            <input type="checkbox" id="settings-splat-rendering-enabled" />

            <span
              id="settings-splat-enabled-style"
              class="grayed-out right-align"
            >
              <label>Size: </label>
              <input
                id="settings-splat-rendering-size"
                step=".01"
                type="number"
              />

              <label>Mode:</label>
              <select id="settings-splat-rendering-point-size-unit">
                <option value="0">ScreenPixels</option>
                <option value="1">CSSPixels</option>
                <option value="2">World</option>
                <option value="3">ScreenWidth</option>
                <option value="4">ScreenHeight</option>
                <option value="5">BoundingDiagonal</option>
              </select>
            </span>
          </div>
          <div class="settings-block">
            <span>Enable Eye-Dome Lighting:</span>
            <input
              type="checkbox"
              id="settings-eye-dome-lighting-enabled"
              class="right-align"
            />
            <span class="clear-both"></span>
          </div>
        </div>

        <!--color-->
        <div class="settings-group-header">Color</div>
        <div class="settings-group settings-group-colors">
          <div class="settings-block">
            <div>Background Color:</div>
            <div>
              <input
                type="text"
                id="settings-background-top"
                class="color-picker"
                data-position="top left"
              />
              <label>Top</label>
            </div>
            <div>
              <input
                type="text"
                id="settings-background-bottom"
                class="color-picker"
                data-position="top left"
              />
              <label>Bottom</label>
            </div>
          </div>
          <div class="settings-block">
            <div>Capping Geometry:</div>
            <div>
              <input
                type="text"
                id="settings-capping-face-color"
                class="color-picker"
                data-position="top left"
              />
              <label>Face</label>
            </div>
            <div>
              <input
                type="text"
                id="settings-capping-line-color"
                class="color-picker"
                data-position="top left"
              />
              <label>Line</label>
            </div>
          </div>
          <div class="settings-block">
            <div>Selection Color:</div>
            <input
              type="text"
              id="settings-selection-color-body"
              class="color-picker"
              data-position="top left"
            />
            <label>Body</label>
            <div>
              <span id="settings-selection-color-face-line-style">
                <input
                  type="text"
                  id="settings-selection-color-face-line"
                  class="color-picker"
                  data-position="top left"
                />
                <label>Faces and Lines</label>
              </span>
            </div>
          </div>
          <div class="settings-block">
            <input
              type="text"
              id="settings-measurement-color"
              class="color-picker"
              data-position="top left"
            />
            <label>Measurement Color</label>
          </div>
          <div class="settings-block">
            <span id="settings-pmi-color-style" class="grayed-out">
              <input
                type="text"
                id="settings-pmi-color"
                class="color-picker"
                data-position="top left"
                disabled
              />
              <label>PMI Override Color</label>
            </span>
            <input type="checkbox" id="settings-pmi-enabled" />
            <label>Enable</label>
          </div>
        </div>
      </div>
      <div>
        <div class="hoops-ui-window-footer">
          <div class="version">
            Viewer Version: <span id="settings-viewer-version"></span>, Format
            Version: <span id="settings-format-version"></span>
          </div>
          <div class="hoops-ui-footer-buttons">
            <button id="viewer-settings-ok-button">Ok</button>
            <button id="viewer-settings-cancel-button">Cancel</button>
            <button id="viewer-settings-apply-button">Apply</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "../stylesheets/hwp-styles/Toolbar.css";
@import "../stylesheets/hwp-styles/TreeControl.css";
@import "../stylesheets/hwp-styles/Common.css";
@import "../stylesheets/hwp-styles/Desktop.css";
@import "../stylesheets/hwp-styles/NoteText.css";
@import "../stylesheets/hwp-styles/jquery-ui.min.css";
@import "../stylesheets/hwp-styles/PropertyWindow.css";
@import "../stylesheets/hwp-styles/ViewerSettings.css";
@import "../stylesheets/hwp-styles/jquery.minicolors.css";

#app {
  width: 100%;
  height: 100%;
}

#viewerContainer {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>