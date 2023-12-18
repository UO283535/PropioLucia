import xml.etree.ElementTree as ET

ns = {
    't': 'http://tempuri.org/rutas'
}

doc = ET.parse('rutasEsquema.xml')
rutas_turisticas_ele = doc.getroot()


print(rutas_turisticas_ele.tag)
for rutas_ele in rutas_turisticas_ele.findall('./t:ruta', ns):
    nombre = rutas_ele.find('./t:nombre', ns).text
    print(nombre)
    for coordenada_ele in rutas_ele.findall('./t:hitos/t:hito/t:coordenadaHito',ns):
        lat = coordenada_ele.find('./t:latitud', ns).text
        long = coordenada_ele.find('./t:longitud', ns).text
        print(lat,long)
cont =1
for rutas_ele in rutas_turisticas_ele.findall('./t:ruta', ns):
    
    nombre_archivo = f"ruta{cont}.kml"
    with open(nombre_archivo, "w") as archivo:
        archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        archivo.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
        archivo.write('<Document>\n')
        archivo.write('<Placemark>\n')
        archivo.write('<name>N1612080.LOG</name>\n')
        archivo.write('<LineString>\n')
        archivo.write('<extrude>1</extrude>\n')
        archivo.write('<tessellate>1</tessellate>\n')
        archivo.write('<coordinates>\n')
        longitud =  rutas_ele.find('./t:coordenada_inicio/t:longitud', ns).text
        latitud =  rutas_ele.find('./t:coordenada_inicio/t:latitud', ns).text
        altitud = rutas_ele.find('./t:coordenada_inicio/t:altitud', ns).text
        archivo.write(f"{longitud},{latitud},{altitud}\n")
        for coordenada_ele in rutas_ele.findall('./t:hitos/t:hito/t:coordenadaHito',ns):
            lat = coordenada_ele.find('./t:latitud', ns).text
            long = coordenada_ele.find('./t:longitud', ns).text
            alt = coordenada_ele.find('./t:altitud', ns).text
            archivo.write(f"{long},{lat},{alt}\n")
        archivo.write('</coordinates> <altitudeMode>relativeToGround</altitudeMode> </LineString> \n')
        archivo.write('</Placemark> </Document> </kml> \n')
        cont+=1