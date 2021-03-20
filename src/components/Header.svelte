<script>
    // JS here
    import { Col, Container, Row} from 'sveltestrap/src';
</script>

<!-- HTML here -->
<div class="parent">
    <Row class="header">
        <Col class="col1" xs='4'>
                <img src="CalPal_Logo.png" alt="CalPal_Logo.png"/> 
                <span class="calpal">
                    <span class="cal">Cal</span>
                    <span class="pal">Pal</span>
                </span>
        </Col>
        <Col class="col2" xs='4'><h1>BLANK</h1></Col>
        <!-- <Col lg="8"></Col> -->
        <Col class="col3" xs='4'><h1>NavBar</h1></Col>
    </Row>
</div>

<style>
    /* CSS here */
    .parent :global(.header) {
        background-color: #78c0e0;
    }

    .parent :global(.col1) {
        /* background-color: red; */
    }

    .parent :global(.col2) {
        /* background-color: blue; */
    }

    .parent :global(.col3) {
        /* background-color: yellow; */
    }

    img {
        width: 70px;
        height: 70px;
        margin-top: -1.3em;
    }

    .calpal {
        font-size: 3em;
        font-family: "Nunito", sans-serif;
        position: relative;
        top: 10px;
        left: -7px;
        text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;
    }

    .cal {
        color: #00b0f0;
    }

    .pal {
        color: #f58f29;
        margin-left: -10px;
    }
</style>