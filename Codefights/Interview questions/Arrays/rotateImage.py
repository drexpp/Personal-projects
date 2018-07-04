def rotateImage(a):
    result = [];
    dicti  = {};
    for idx, i in enumerate(reversed(range(0, len(a)))):
        print(a[i], idx);
        if idx == 0:
            for idx, element in enumerate(a[i]):
                if idx == 0:
                    dicti[idx] = [element];
                else:
                    dicti[idx] = [element];
        else:
            for idx, element in enumerate(a[i]):
                if idx == 0:
                    dicti[idx].append(element);
                else:
                    dicti[idx].append(element);

    for element in dicti:
        result.append(dicti[element]);

    return result;
