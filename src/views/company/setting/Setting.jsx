import { Form, Formik } from 'formik';
import React from 'react';
import TextField from '@mui/material/TextField';
import BaseInputField from 'Components/Formik/BaseInputField';

function Setting() {
  return (
    <div>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" name="name" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" name="email" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" name="dialing_code" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" name="phone" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" name="gender" /> */}
          <BaseInputField name="name" type="text" placeholder={'name'} label={'name'} />
        </Form>
      </Formik>
    </div>
  );
}

export default Setting;
