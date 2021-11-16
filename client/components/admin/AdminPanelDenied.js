import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const AdminPanelDenied = (props) => {
  return (
    <div className="adminPanel">
      Not for you!
    </div>
  );
};

export default connect(null)(AdminPanelDenied);
