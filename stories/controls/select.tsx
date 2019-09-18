import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ButtonsGroup, Select, SelectList, SelectListItem, Search } from '../../src/ui';
import { ISelectActiveInheritedProps } from '../../src/ui/select/types';

const Story = () => {

    const [val, setVal] = React.useState(0);
    const [val01, setVal01] = React.useState(null);
    const [val02, setVal02] = React.useState(40);
    const [val03, setVal03] = React.useState(0);
    const [val04, setVal04] = React.useState(null);
    const [val05, setVal05] = React.useState(0);

    const [searchOptions, setSearchOptions] = React.useState([
        {active: false, value: 0, text: 'Option 0'},
        {active: false, value: 1, text: 'Option 1'},
        {active: false, value: 2, text: 'Option 2'},
        {active: false, value: 3, text: 'Option 3'},
        {active: false, value: 10, text: 'Option 10'},
        {active: false, value: 11, text: 'Option 11'},
        {active: false, value: 12, text: 'Option 12'},
        {active: false, value: 13, text: 'Option 13'},
    ]);
    const [searchFiltered, setSearchFiltered] = React.useState(searchOptions);

    const filterSearchOptions = (i: ISelectActiveInheritedProps) => {
        if (i.item) {
            const index = searchOptions.findIndex(option => String(option.value) === String(i.item.value));
            const option = searchOptions[index];
            setSearchOptions([
                ...searchOptions.slice(0, index),
                {
                    ...option,
                    active: !option.active
                },
                ...searchOptions.slice(index + 1),
            ]);
            searchFiltered[i.item.index].active = !searchFiltered[i.item.index].active;
            setSearchFiltered(searchFiltered);
        } else if (i.target) {
            const target: any = i.target;
            const value = target.value;
            const filteredOptions = value ?
                searchOptions.filter(option => option.text.includes(value)) :
                searchOptions;
            setSearchFiltered([...filteredOptions]);
        }
    }

    return (
        <div className="page">
            <section className="section-form-min">
                <h2>Select</h2>

                <Search
                    editable={true}
                    label="Multiple"
                    multiple={true}
                    options={searchFiltered}
                    onChange={filterSearchOptions}
                >
                </Search>

                {
                    searchOptions.reduce((actives, option) => {
                        if (option.active) {
                            actives.push(option.text || option.value);
                        }
                        return actives;
                    }, []).join(', ')
                }

                <br/><br/>

                <Select
                    active={1}
                    disabled
                    label="Disabled"
                    options={{
                        0: 'Option 0',
                        1: 'Option 1'
                    }}
                    variant="arrow"
                    onChange={null}
                >
                </Select>

                <br/><br/>

                <Select
                    active={val04}
                    label="Options Object"
                    options={{
                        0: 'Option 0',
                        1: 'Option 1',
                        '2': 'Option 2'
                    }}
                    variant="arrow"
                    onChange={(i: ISelectActiveInheritedProps) => {
                        console.log(i.item.text);
                        setVal04(i.item.index);
                    }}
                >
                </Select>

                <br/><br/>

                <Select
                    active={val05}
                    editable={true}
                    label="Options Array"
                    options={[
                        {value: 0, text: 'Option 0'},
                        {value: 1, text: 'Option 1'},
                        {value: '2', text: 'Option 2'},
                    ]}
                    variant="arrow"
                    onChange={(i: ISelectActiveInheritedProps) => {
                        if (i.item) {
                            console.log(i.item.text);
                            setVal05(i.item.index);
                        }
                    }}
                >
                </Select>

                <br/><br/>

                <Select
                    active={val}
                    label="Header"
                    variant="header"
                    onChange={(i: ISelectActiveInheritedProps)=>setVal(i.item.index)}
                >
                    <SelectList>
                        <li className="starter" value="sy" >
                            Starter yearly
                        </li>
                        <li value="pm">
                            Professional monthly
                        </li>
                    </SelectList>
                </Select>

                <br/><br/>

                <Select
                    active={0}
                    disabled={true}
                    label="Disabled"
                    value="Professional monthly"
                    variant="header"
                    onChange={()=>{}}
                ></Select>

            </section>

            <section>
                    <h2>Editable</h2>
                    <div className="section-relative">
                        <ButtonsGroup size="large">
                            <Select
                                active={val01}
                                editable={true}
                                label="Number"
                                style={{width: 100}}
                                type="number"
                                variant="arrow"
                                onChange={(i: ISelectActiveInheritedProps) => {
                                    if (i.item) {
                                        setVal01(i.item.index)
                                    }
                                }}
                            >
                                <SelectList>
                                    <li className="divider">0</li>
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                    <li>4</li>
                                    <li>5</li>
                                    <li>6</li>
                                    <li>7</li>
                                    <li>8</li>
                                    <li>9</li>
                                    <li className="divider">10</li>
                                    <li className="disabled">Disabled</li>
                                </SelectList>
                            </Select>
                            <Select
                                active={val02}
                                editable={true}
                                label="Time"
                                icon="deadline"
                                variant="withicon"
                                style={{width: 120}}
                                onChange={(i: ISelectActiveInheritedProps) => {
                                    if (i.item) {
                                        setVal02(i.item.index)
                                    }
                                }}
                            >
                                <SelectList>
                                    <li>12:00 AM</li>
                                    <li>12:30 AM</li>
                                    <li>01:00 AM</li>
                                    <li>01:30 AM</li>
                                    <li>02:00 AM</li>
                                    <li>02:30 AM</li>
                                    <li>03:00 AM</li>
                                    <li>03:30 AM</li>
                                    <li>04:00 AM</li>
                                    <li>04:30 AM</li>
                                    <li>05:00 AM</li>
                                    <li>05:30 AM</li>
                                    <li>06:00 AM</li>
                                    <li>06:30 AM</li>
                                    <li>07:00 AM</li>
                                    <li>07:30 AM</li>
                                    <li>08:00 AM</li>
                                    <li>08:30 AM</li>
                                    <li>09:00 AM</li>
                                    <li>09:30 AM</li>
                                    <li>10:00 AM</li>
                                    <li>10:30 AM</li>
                                    <li>11:00 AM</li>
                                    <li className="divider">11:30 AM</li>
                                    <li>12:00 PM</li>
                                    <li>12:30 PM</li>
                                    <li>01:00 PM</li>
                                    <li>01:30 PM</li>
                                    <li>02:00 PM</li>
                                    <li>02:30 PM</li>
                                    <li>03:00 PM</li>
                                    <li>03:30 PM</li>
                                    <li>04:00 PM</li>
                                    <li>04:30 PM</li>
                                    <li>05:00 PM</li>
                                    <li>05:30 PM</li>
                                    <li>06:00 PM</li>
                                    <li>06:30 PM</li>
                                    <li>07:00 PM</li>
                                    <li>07:30 PM</li>
                                    <li>08:00 PM</li>
                                    <li>08:30 PM</li>
                                    <li>09:00 PM</li>
                                    <li>09:30 PM</li>
                                    <li>10:00 PM</li>
                                    <li>10:30 PM</li>
                                    <li>11:00 PM</li>
                                    <li>11:30 PM</li>
                                </SelectList>
                            </Select>
                        </ButtonsGroup>
                    </div>

            </section>

            <section>
                    <h2>Direction</h2>

                    <p>directionVertical="up"</p>

                    <Select
                        active={val03}
                        directionVertical="up"
                        variant="priority"
                        onChange={(i: ISelectActiveInheritedProps)=>setVal03(i.item.index)}
                    >
                        <SelectList>
                            <SelectListItem value="0" icon="priority-no">
                                No priority
                            </SelectListItem>
                            <SelectListItem value="1" icon="priority-low">
                                Low
                            </SelectListItem>
                            <SelectListItem value="2" icon="priority-normal">
                                Normal
                            </SelectListItem>
                            <SelectListItem value="3" icon="priority-medium">
                                Medium
                            </SelectListItem>
                            <SelectListItem value="4" icon="priority-high">
                                High
                            </SelectListItem>
                            <SelectListItem value="5" icon="priority-critical">
                                Critical
                            </SelectListItem>
                        </SelectList>
                    </Select>
                </section>

        </div>
    );
};

storiesOf('Controls', module)
    .add('Select', () => <Story/>);
