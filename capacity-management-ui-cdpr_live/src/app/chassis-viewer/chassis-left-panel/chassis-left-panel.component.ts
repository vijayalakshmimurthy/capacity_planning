import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, OnInit } from '@angular/core';
import { TreeViewInputs } from '../../shared/interface/TreeViewInputs';
import { TreeNode } from "primeng/api";
import { SrimsNavigatorComponent } from '@BT/srims-navigator';
import { NavigatorConstants } from '../../shared/constants/dsr-productType.constant';
import { Identifiers } from '@angular/compiler';
/** Chassis Left Panel contains info, device data and service data in tree view
 *  @author divya.rajasekar@bt.com
 */
@Component({
  selector: 'app-chassis-left-panel',
  templateUrl: './chassis-left-panel.component.html',
  styleUrls: ['./chassis-left-panel.component.scss']
})
export class ChassisLeftPanelComponent implements OnInit, OnChanges {
  /** Left panel data */
  @Input() leftPanelInfo;
  /** Left panel Title */
  @Input() leftPanelTitle;
  /** selectedNodeId to highlight navigator */
  @Input() selectNodeBasedonIds: any;
  /** service data to load under service tab */
  @Input() getServiceData: any;
  /** should show clearAll button when true */
  @Input() showclearAllBtn: boolean;
  /** display loader when true */
  @Input() showLoader;
  @Input() errorMsgService;
  /** Navigator data */
  @Input() tree;
  /** card move work flow enable */
  @Input() workflowenable;
  /** navigator eyeicon enable */
  @Input() changecountvalue;
  /** Emit value onclick of expand icon */
  @Output() expandLeftPanel = new EventEmitter();
  /** Emit value onclick of clearAll icon */
  @Output() resetImgvalues = new EventEmitter();
  /** Emit value from nodeSelect event is called in navigator */
  @Output() ejectDeviceSelection = new EventEmitter();
  /** Emit value from view event is called in navigator */
  @Output() emitDeviceIndex = new EventEmitter();
  /** Tabs name */
  navTabsName = NavigatorConstants;
  /** Set default selected tab to one */
  selectedwallet = this.navTabsName[0];
  /** Expand left panel is false by default */
  resizePanel = false;
  /** get shelfNo when user clicked on eye */
  currentShelfNo = 'shelf=1';
  /** get shelfNo when user clicked on card/port */
  selectedShelfNo: string;
  @Input() toggleIndex;
  @Input() modeChangeValue;
  @Input() lagGroupno;
  nodes: TreeNode[];
  count = 1;
  enablegetservice = true;
  /** create object for navigator to access all variable and methods */
  @ViewChild(SrimsNavigatorComponent, { static: false }) public navigator: SrimsNavigatorComponent;
  // @ViewChild(SrimsNavigatorComponent, { static: false }) public servicenavigator: SrimsNavigatorComponent;

  /** Settings for Navigator package */
  public treeSettings: TreeViewInputs = {
    nodes: {
      selectionMode: 'multiple',
      labelDelimiter: '-'
    },
    fields: {
      filter: false,
      selectAll: false,
      placeHolder: '--Select--'
    }
  };
 
  /** create object for service */
  constructor() { }

  ngOnInit() {

    if (this.workflowenable) {
      this.treeSettings.nodes.selectionMode = 'single';
    } else {
      this.treeSettings.nodes.selectionMode = 'multiple';
    }
    
  }
  /** show loader, enable service tab and select node based on input value */
  ngOnChanges() {
   
    if(this.changecountvalue === 1){
      this.count = this.changecountvalue;
    }

    this.navTabsName.forEach((data) => {
      if (this.showLoader) {
        data.disable = true;
      } else if (Object.keys(this.getServiceData).length !== 0 && data.name === 'Get Service' && this.errorMsgService.length !== 0) {
        data.disable = false;
      } else if (Object.keys(this.getServiceData).length === 0 && data.name === 'Get Service' && this.errorMsgService.length === 0) {
        data.disable = true;
      } else {
        data.disable = false;
      }
    });
    if(this.getServiceData) {
      this.nodes = [];
      if (Object.keys(this.getServiceData).length !== 0 && this.errorMsgService.length == 0) {
        this.nodes = this.getServiceData.navigator.nodes;
      } else{
        this.enablegetservice= false;
      }
    }
    if (this.selectNodeBasedonIds && this.selectNodeBasedonIds.length) {
      this.enablegetservice = true;
        if(this.nodes !== undefined && this.nodes.length > 0) {
          this.expandAll(this.nodes);
        } 
    } else {
      this.enablegetservice= false;
    }
    if (this.navigator) {
      if (this.selectNodeBasedonIds && this.selectNodeBasedonIds.length) {
        this.navigator.resetSelection();
        this.navigator.selectNode(this.selectNodeBasedonIds);
      } else {
        this.navigator.resetSelection();
      }
    }
    if (this.modeChangeValue) {
      this.navigator.resetCollapse();
    }
    // if (this.servicenavigator && this.getServiceData.navigator) {
    //   this.servicenavigator.expandSelectedNode(this.getServiceData.navigator.idList, this.getServiceData.navigator.nodes);
    // }
  }

  expandAll(nodeData) {
    nodeData.forEach(node => {
      console.log(node);
      this.expandRecursive(node, true);
    });
  }
  collapseAll(nodeData){
    nodeData.forEach( node => {
        this.expandRecursive(node, false);
    } );
}
  expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
  /** Resize left panel while clicking on expand icon */
  expandPanel() {
    this.resizePanel = !this.resizePanel;
    this.expandLeftPanel.emit(this.resizePanel);
  }

  /** Listen event when there is a change in tree structure */
  listenToNavigator(event) {
    console.log(event);
    if (this.tree.navigator.nodes[0].children.length > 1) {
      if(this.count === 1) {
        this.navigator.showOrHideNodeIcons(this.tree.navigator.nodes[0].children[this.toggleIndex]);
      }
    }
    let shelfDetails;
    switch (event.name) {
      case 'view':
        shelfDetails = event.data.nodeData.id.split('/');
        this.currentShelfNo = shelfDetails[1].substring(0, 7);    
        this.toggleIndex =  event.data.nodeData.index;
        this.emitDeviceIndex.emit(event.data.nodeData.index);
        this.navigator.showOrHideNodeIcons(this.tree.navigator.nodes[0].children[event.data.nodeData.index]);
        break;
      case 'nodeSelect':
        this.currentShelfNo = `shelf=${this.toggleIndex + 1}`
        const info = event.data.nodeData.node.info;
        this.getSelectedNodes(event.data);
        break;
    }
    this.count++;
  }

  /** load and emit all the selected node id to parent */
  getSelectedNodes(data) {
    const selectedId = [];
    let serviceReqValue = [];
    if (this.treeSettings.nodes.selectionMode === 'single') {
      if (data.nodeData) {
        const nodeType = data.nodeData.node.nodeType;
        if (nodeType !== 'device' && nodeType !== 'chassis' && nodeType !== 'shelf') {
          selectedId.push(data.nodeData.node.id);
          if (nodeType !== 'holder') {
            const id = data.nodeData.node.id.indexOf(':');
            const modelid = data.nodeData.node.id.substring(id + 1);
            serviceReqValue.push(modelid);
          } else {
            serviceReqValue = [];
          }
        }
      }
    } else {
      if (data.selectedNodes) {
        data.selectedNodes.forEach((value) => {
          this.selectedShelfNo = value.id.split('/');
          console.log(this.currentShelfNo, this.selectedShelfNo[1]);
          if (this.currentShelfNo === this.selectedShelfNo[1]) {
            if (value.nodeType !== 'device' && value.nodeType !== 'chassis' && value.nodeType !== 'shelf') {
              selectedId.push(value.id);
              if (value.nodeType !== 'holder') {
                const id = value.id.indexOf(':');
                const modelid = value.id.substring(id + 1);
                serviceReqValue.push(modelid);
              } else {
                serviceReqValue = [];
              }
            }
          }
        });
      }
    }
    if (selectedId.length > 0) {
      this.showclearAllBtn = true;
    } else {
      this.showclearAllBtn = false;
    }
    const details = {
      selectedNodeId: selectedId,
      currentNodeData: data.nodeData.node,
      serviceReqData: serviceReqValue
    };
    this.ejectDeviceSelection.emit(details);
  }

  /** return zero */
  returnZero() {
    return 0;
  }

  /** should call when clearall icon is clicked */
  clearImgvalues() {    
    if (this.selectedwallet.name === 'Get Service') {
      this.selectedwallet = this.navTabsName[0];
    }
    this.getServiceData = [];
    this.navigator.resetSelection();
    this.navigator.resetCollapse();
    this.resetImgvalues.emit();
  }
}
